import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (productId) => {
        console.log(`Added product ${productId} to cart`);
        
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const productToAdd = products.find(product => product._id === productId);
        if (productToAdd) {
            cartItems.push(productToAdd);
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen text-center">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <img src={product.imageUrl} alt={product.name} className="mb-4 rounded w-96 ml-8" />
                            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                            <p className="text-lg mb-2">${product.price}</p>
                            <div className="flex justify-center space-x-4 mt-4">
                                <Link to={`/products/${product._id}`} className="bg-pink-800 text-white py-2 px-4 rounded hover:bg-pink-700">View Details</Link>
                                <button onClick={() => handleAddToCart(product._id)} className="bg-fuchsia-900 text-white py-2 px-4 rounded hover:bg-fuchsia-800">Add to Cart</button>
                                <button onClick={handleGoToCart} className="bg-rose-800 text-white py-2 px-4 rounded hover:bg-rose-700">Go to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;









