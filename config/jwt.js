require('dotenv').config();

module.exports = {
    alg: process.env.JWT_ALG,
    expiresIn: process.env.JWT_EXPIRES_IN,
    typ: process.env.JWT_TYP,
    secret: process.env.JWT_SECRET
};