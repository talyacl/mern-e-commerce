import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching the product details:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div className="bg-gray-900 text-white min-h-screen">Loading...</div>;

    const handleAddToCart = (productId) => {
        console.log(`Added product ${productId} to cart`);
        
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const productToAdd = cartItems.find(item => item._id === productId);
        if (!productToAdd) {
            cartItems.push(product);
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                    <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 rounded" />
                    <div className="md:w-2/3">
                        <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                        <p className="text-lg mb-4">{product.description}</p>
                        <p className="text-2xl font-bold mb-4">${product.price}</p>
                        <button onClick={() => handleAddToCart(product._id)} className="bg-fuchsia-900 text-white py-2 px-4 rounded hover:bg-fuchsia-800 ml-4">Add to Cart</button>
                        <button onClick={handleGoToCart} className="bg-rose-800 text-white py-2 px-4 rounded hover:bg-rose-700 ml-4">Go to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;


