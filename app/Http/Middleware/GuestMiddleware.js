const jwt = require("jsonwebtoken");
const config = require("../../../config");

module.exports = (req, res, next) => {
    const token = req.session.accessToken;

    if (! token) {
        next(); // Proceed to the next middleware or route handler
    } else {
        jwt.verify(token, config.jwt.secret, (err, user) => {
            if (err) {
                next(); // Proceed to the next middleware or route handler
            } else {
                res.redirect('/');
            }
        });
    }
}