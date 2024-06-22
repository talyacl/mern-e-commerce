import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">
                    <img src="heartlogo.png" alt="Theia" className="w-10 h-10 inline-block mr-2" />
                    Theia</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                    <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
                    <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
                    <Link to="/orders" className="text-gray-300 hover:text-white">Orders</Link>
                    <Link to="/cart" className="text-gray-300 hover:text-white">Cart</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <Link to="/" className="block text-gray-300 hover:text-white p-2">Home</Link>
                    <Link to="/login" className="block text-gray-300 hover:text-white p-2">Login</Link>
                    <Link to="/register" className="block text-gray-300 hover:text-white p-2">Register</Link>
                    <Link to="/products" className="block text-gray-300 hover:text-white p-2">Products</Link>
                    <Link to="/orders" className="block text-gray-300 hover:text-white p-2">Orders</Link>
                    <Link to="/cart" className="block text-gray-300 hover:text-white p-2">Cart</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
