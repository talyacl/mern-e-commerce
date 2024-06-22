const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(403).json('No token provided');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
};

const orders = [
    { id: 1, product: 'Product 1', quantity: 2, price: 20 },
    { id: 2, product: 'Product 2', quantity: 1, price: 50 }
];


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { user, products, totalPrice, status } = req.body;
    try {
        const newOrder = new Order({
            user,
            products,
            totalPrice,
            status
        });
        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;