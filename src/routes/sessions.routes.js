const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionsController = require('../controllers/sessions.controller');

router.post('/login', sessionsController.login);

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            message: 'Login successful!',
            user: req.user
        });
    }
);

module.exports = router;
