import { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const stripePromise = loadStripe('STRIPE_SECRET_KEY');

const CheckoutForm = () => {
    const { cart } = useContext(CartContext);
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/payment', {
                    cartItems: cart
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };

        createPaymentIntent();
    }, [cart]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen text-center">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                        <CardElement className="bg-gray-700 p-3 rounded-lg w-full" />
                    </div>
                    <button
                        type="submit"
                        disabled={processing || succeeded}
                        className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-500"
                    >
                        {processing ? "Processing..." : "Pay Now"}
                    </button>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </form>
            </div>
        </div>
    );
};

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
