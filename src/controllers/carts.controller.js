const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const TicketsDAO = require('../dao/classes/tickets.dao');
const { v4: uuidv4 } = require('uuid');

exports.getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        return res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;

        const [cart, product] = await Promise.all([
            Cart.findById(cid),
            Product.findById(pid)
        ]);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const item = cart.products.find(p => p.product.toString() === pid);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        const populated = await cart.populate('products.product');
        return res.status(201).json(populated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.removeProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const prevLen = cart.products.length;
        cart.products = cart.products.filter(p => p.product.toString() !== pid);

        if (cart.products.length === prevLen) {
            return res.status(404).json({ message: 'Product not in cart' });
        }

        await cart.save();
        const populated = await cart.populate('products.product');
        return res.json(populated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        let totalAmount = 0;
        const purchasedProducts = [];
        const notPurchased = [];

        for (const item of cart.products) {
            const product = item.product;
            const quantity = item.quantity;

            if (product.stock >= quantity) {
                product.stock -= quantity;
                totalAmount += product.price * quantity;
                purchasedProducts.push({ product: product._id, quantity });
                await product.save();
            } else {
                notPurchased.push(item);
            }
        }

        if (purchasedProducts.length === 0) {
            return res.status(400).json({ message: 'No products could be purchased due to stock limitations' });
        }

        const ticketData = {
            code: uuidv4(),
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: req.user?.email || 'anonymous'
        };

        const ticket = await TicketsDAO.create(ticketData);

        cart.products = notPurchased;
        await cart.save();

        return res.status(200).json({ message: 'Purchase completed', ticket });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};