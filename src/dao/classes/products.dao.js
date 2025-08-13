const Product = require('../../models/product.model');

class ProductsDAO {
    findAll() { return Product.find(); }
    findById(id) { return Product.findById(id); }
    create(data) { return Product.create(data); }
    update(id, data) { return Product.findByIdAndUpdate(id, data, { new: true }); }
    delete(id) { return Product.findByIdAndDelete(id); }
}

module.exports = new ProductsDAO();
