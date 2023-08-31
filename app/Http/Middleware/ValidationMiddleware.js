const { validationResult } = require('express-validator');
const validation = require('../../../resources/lang/en/validation.json');

const validate = (rules) => {
    return async (req, res, next) => {
        await Promise.all(rules.map(rule => rule.run(req)));

        const errors = validationResult(req);

        if (! errors.isEmpty()) {
            const formattedErrors = {};

            errors.errors.forEach(error => {
                formattedErrors[error.path] = error.msg;
            });

            req.flash('validationErrors', JSON.stringify(formattedErrors));

            return res.redirect(req.get('Referer') || '/');
        }

        next();
    };
};

const withMessage = (message, replacements) => {
    message = getObjectByDotNotation(validation, message);

    for (const key in replacements) {
        const placeholder = `:${key}`;
        if(typeof message !== 'undefined') {
            message = message.replace(placeholder, replacements[key]);
        }
    }

    return message;
}

const getObjectByDotNotation = (obj, keyString) => {
    const keysArray = keyString.split('.')
    return keysArray.reduce((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return acc[key];
        }
        return undefined;
    }, obj);
}

module.exports = {validate, withMessage};