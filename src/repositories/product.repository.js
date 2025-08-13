const productsDAO = require('../dao/classes/products.dao');

class ProductRepository {
    list() { return productsDAO.findAll(); }
    get(id) { return productsDAO.findById(id); }
    create(payload) { return productsDAO.create(payload); }
    update(id, payload) { return productsDAO.update(id, payload); }
    delete(id) { return productsDAO.delete(id); }
}

module.exports = new ProductRepository();
