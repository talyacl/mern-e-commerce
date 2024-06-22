import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-sm font-bold">Theia</h2>
                        <p>&copy; {new Date().getFullYear()} Theia. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <Link to="/products" className="hover:text-white">Products</Link>
                        <Link to="/cart" className="hover:text-white">Cart</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
