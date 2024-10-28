const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const authMiddleware = require('../Middleware/auth.middleware');
const validator = require('../validators/auth.validator');

// Register route
router.post('/register', validator.registerValidationRules(), validator.validate, authController.register);

// Login route
router.post('/login', validator.loginValidationRules(), validator.validate, authController.login);

// Profile route (protected)
router.get('/profile', authMiddleware.verifyUserToken, authController.getProfile);

router.put('/updateProfile', authMiddleware.verifyUserToken, authController.updateProfile )

router.post('/logout', authMiddleware.verifyUserToken, authController.logout)
module.exports = router;
