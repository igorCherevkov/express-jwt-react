const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', checkAuth, userController.check);

module.exports = router;