const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

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

        // validar que existan cart y product
        const [cart, product] = await Promise.all([
            Cart.findById(cid),
            Product.findById(pid)
        ]);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // buscar si ya existe el producto en el carrito
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

// Dejamos purchase para el punto de Tickets/stock
exports.purchaseCart = async (req, res) => {
    try {
        return res.status(501).json({ message: 'purchaseCart pendiente de implementación (tickets/stock)' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
