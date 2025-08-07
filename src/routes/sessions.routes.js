const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionsController = require('../controllers/sessions.controller');

router.post('/login', sessionsController.login);

// Desacoplar lógica: usar el controller
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    sessionsController.currentSession
);

module.exports = router;