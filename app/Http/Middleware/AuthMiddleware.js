const jwt = require("jsonwebtoken");
const config = require("../../../config");

const User = require('../../Models/User');

module.exports = (req, res, next) => {
    const token = req.session.accessToken;

    if (token) {
        jwt.verify(token, config.jwt.secret, async (err, decoded) => {
            if (err) {
                res.redirect('/login');
            }

            res.locals.user = await User.findByPk(decoded.user.id);

            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.redirect('/login');
    }
}