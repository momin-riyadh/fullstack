require('dotenv').config();

const config = {
    app:{
        key: process.env.APP_KEY,
        port: process.env.APP_PORT
    },

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },

    session: {
        lifetime: process.env.SESSION_LIFETIME
    }
};

module.exports = config;