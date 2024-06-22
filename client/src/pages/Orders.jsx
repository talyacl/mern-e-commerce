import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Orders</h1>
                <ul>
                    {orders.map((order) => (
                        <li key={order._id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                            <p className="text-xl font-bold text-gray-100">{order.product}</p>
                            <p className="text-lg text-gray-300">Quantity: {order.quantity}</p>
                            <p className="text-lg text-gray-300">Price: ${order.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Orders;
