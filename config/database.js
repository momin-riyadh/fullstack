require('dotenv').config();

module.exports = {
    connection: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    migrationStoragePath: 'database/migrations',
    seederStoragePath: 'database/seeders',
};