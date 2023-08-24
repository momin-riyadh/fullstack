const { body, validationResult } = require('express-validator');
const ValidationMiddleware = require('../Middleware/ValidationMiddleware');

const rules = [
    body('username').trim().notEmpty().withMessage('The field is required.'),
    body('password').trim().notEmpty(),
];

module.exports = {
    rules,
    validate: ValidationMiddleware(rules)
};