const jwt = require('jsonwebtoken');
const config = require('./config');

// Authentication middleware
function authMiddleware(req, res, next){//console.log(req.getHeader('Authorization'))
    const token = req.session.accessToken;

    if (token) {
        jwt.verify(token, config.jwt.secret, (err, user) => {
            if (err) {
                res.redirect('/login');
            }
            //req.user = decode.user; // Attach user info to request
            console.log(user);
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.redirect('/login');
    }
}

// Guest middleware
function guestMiddleware(req, res, next){
    const token = req.session.accessToken;console.log('guestMiddleware-', token);

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

module.exports = {authMiddleware, guestMiddleware};