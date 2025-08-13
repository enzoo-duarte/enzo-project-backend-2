const Cart = require('../../models/cart.model');

class CartsDAO {
    getById(id) {
    return Cart.findById(id).populate('products.product');
    }

    async addProduct(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const idx = cart.products.findIndex(p => p.product.toString() === pid);
    if (idx >= 0) cart.products[idx].quantity += quantity;
    else cart.products.push({ product: pid, quantity });

    await cart.save();
    return cart;
    }

    async removeProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
    }
}

module.exports = new CartsDAO();
