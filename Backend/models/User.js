const DataTypes = require('sequelize');
const database = require('./connection');

const User = database.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },

    resetPasswordExpires: {
        type: DataTypes.STRING,
        allowNull: true
    },

    imageUrlUser: {
        type: DataTypes.STRING,
        allowNull: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

});

module.exports = User;