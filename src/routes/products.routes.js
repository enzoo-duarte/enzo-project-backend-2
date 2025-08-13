const express = require('express');
const router = express.Router();

const { authenticateJWT, checkRole } = require('../middlewares/auth.middleware');
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

router.post('/', authenticateJWT, checkRole('admin'), productsController.createProduct);
router.put('/:id', authenticateJWT, checkRole('admin'), productsController.updateProduct);
router.delete('/:id', authenticateJWT, checkRole('admin'), productsController.deleteProduct);

module.exports = router;