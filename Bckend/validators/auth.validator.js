const { check, validationResult } = require('express-validator');

// Registration validation rules
const registerValidationRules = () => {
    return [
        check('username').notEmpty().withMessage('Username is required'),
        check('email').isEmail().withMessage('Email is invalid'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ];
};

// Login validation rules
const loginValidationRules = () => {
    return [
        check('email').isEmail().withMessage('Email is invalid'),
        check('password').notEmpty().withMessage('Password is required'),
    ];
};

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { registerValidationRules, loginValidationRules, validate };
