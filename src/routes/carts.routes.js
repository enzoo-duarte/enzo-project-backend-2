const express = require('express');
const router = express.Router();

const { authenticateJWT, checkRole } = require('../middlewares/auth.middleware');
const cartsController = require('../controllers/carts.controller');

// Ver carrito (user o admin pueden verlo)
router.get('/:cid', authenticateJWT, checkRole('user', 'admin'), cartsController.getCartById);

// Agregar producto al carrito (solo USER)
router.post('/:cid/products/:pid', authenticateJWT, checkRole('user'), cartsController.addProductToCart);

// Quitar producto del carrito (solo USER)
router.delete('/:cid/products/:pid', authenticateJWT, checkRole('user'), cartsController.removeProductFromCart);

// (a futuro) Finalizar compra del carrito (solo USER)
router.post('/:cid/purchase', authenticateJWT, checkRole('user'), cartsController.purchaseCart);

module.exports = router;