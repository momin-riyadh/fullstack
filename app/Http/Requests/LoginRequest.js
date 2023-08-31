const { body, validationResult } = require('express-validator');
const ValidationMiddleware = require('../Middleware/ValidationMiddleware');

const rules = [
    body('username')
        .trim()
        .notEmpty().withMessage(ValidationMiddleware.withMessage('required', {'attribute': 'username'})),

    body('password')
        .trim()
        .notEmpty().withMessage(ValidationMiddleware.withMessage('required', {'attribute': 'password'})),
];

module.exports = {
    rules,
    validate: ValidationMiddleware.validate(rules)
};