const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');

router.post('/login', sessionsController.login);

module.exports = router;