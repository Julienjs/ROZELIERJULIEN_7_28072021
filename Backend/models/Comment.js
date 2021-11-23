const DataTypes = require('sequelize');
const database = require('./connection');

const Comment = database.define("Comment", {
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },

});

module.exports = Comment;