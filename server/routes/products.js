const express = require('express');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');

const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(403).json('No token provided');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
};

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl
        });
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put('/:id', verifyToken, async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
        const updatedProduct = await
        Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            imageUrl
        }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await
        Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}); 


module.exports = router;
