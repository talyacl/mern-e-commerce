import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            <div className="relative bg-black text-white py-20 px-4 text-center" style={{ backgroundImage: "url('https://i.pinimg.com/564x/8e/6a/dd/8e6add28eceddbbb1a29a1aae1e0cc97.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Theia</h1>
                    <p className="text-lg mb-8">Discover your next great read</p>
                    <Link to="/products" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">Shop Now</Link>
                </div>
            </div>


            <div className="container mx-auto py-10 px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-gray-800 p-4 rounded shadow-md text-center">
                            <img src={product.imageUrl} alt={product.name} className="mb-4 w-64 ml-24"/>
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-300 mb-4">{product.description}</p>
                            <Link to={`/products/${product._id}`} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;



