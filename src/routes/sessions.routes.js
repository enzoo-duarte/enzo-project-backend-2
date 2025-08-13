const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionsController = require('../controllers/sessions.controller');

// Ruta de login
router.post('/login', sessionsController.login);

// Ruta de recuperacion de la contraseña
router.post('/forgot-password', sessionsController.forgotPassword);

// Ruta para restablecer la contraseña usando el token del email
router.post('/reset-password/:token', sessionsController.resetPassword);

// Ruta protegida con el JWT 
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    sessionsController.currentSession
);

module.exports = router;
