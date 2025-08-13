const cartsDAO = require('../dao/classes/carts.dao');

class CartRepository {
    get(id) { return cartsDAO.getById(id); }
    addProduct(cid, pid, qty) { return cartsDAO.addProduct(cid, pid, qty); }
    removeProduct(cid, pid) { return cartsDAO.removeProduct(cid, pid); }
}

module.exports = new CartRepository();
