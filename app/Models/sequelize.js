const Sequelize = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: config.database.connection
});

module.exports = sequelize;