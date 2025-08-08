const express = require('express');
const router = express.Router();

const { authenticateJWT, checkRole } = require('../middlewares/auth.middleware');
const productsController = require('../controllers/products.controller');

// Público
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

// Solo ADMIN puede crear/editar/borrar
router.post('/', authenticateJWT, checkRole('admin'), productsController.createProduct);
router.put('/:id', authenticateJWT, checkRole('admin'), productsController.updateProduct);
router.delete('/:id', authenticateJWT, checkRole('admin'), productsController.deleteProduct);

module.exports = router;