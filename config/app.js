require('dotenv').config();

module.exports = {
    key: process.env.APP_KEY,
    name: process.env.APP_NAME,
    port: process.env.APP_PORT
};