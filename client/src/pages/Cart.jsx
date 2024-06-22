import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        navigate('/checkout');

        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Cart</h1>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 flex items-center">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                            <div>
                                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                                <p className="text-gray-300 mb-2">{item.description}</p>
                                <p className="text-lg font-bold">${item.price}</p>
                                <button onClick={() => removeFromCart(item._id)} className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600 mt-2">Remove from Cart</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-6">
                    <button onClick={handleCheckout} className="bg-indigo-800 text-white py-4 px-8 rounded hover:bg-indigo-700">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;









