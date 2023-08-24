const { validationResult } = require('express-validator');

const validate = (rules) => {
    return async (req, res, next) => {
        await Promise.all(rules.map(rule => rule.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('validationErrors', JSON.stringify(errors.mapped()));

            return res.redirect(req.get('Referer') || '/');
        }

        next();
    };
};

module.exports = validate;