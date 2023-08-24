const {DataTypes, STRING, Model} = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        //autoIncrement: true,
    },
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    createdAt: 'created_at', // Use a custom column name for createdAt
    updatedAt: 'updated_at', // Use a custom column name for updatedAt
    modelName: 'users' // We need to choose the model name
});

User.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name;
};

module.exports = User;
