require('dotenv').config();

const config = {
    app:{
        key: process.env.APP_KEY,
        name: process.env.APP_NAME,
        port: process.env.APP_PORT
    },

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },

    jwt: {
        alg: process.env.JWT_ALG,
        expiresIn: process.env.JWT_EXPIRES_IN,
        typ: process.env.JWT_TYP,
        secret: process.env.JWT_SECRET
    },

    session: {
        lifetime: process.env.SESSION_LIFETIME
    }
};

module.exports = config;