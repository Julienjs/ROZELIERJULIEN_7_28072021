const DataTypes = require('sequelize');
const database = require('./connection');

const Post = database.define("Post", {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imageUrlPost: {
        type: DataTypes.STRING,
        allowNull: true
    },

    video: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // likes: {
    //     type: DataTypes.NUMBER,
    //     allowNull: true
    // },

    // usersLiked: {
    //     type: [DataTypes.STRING],
    //     allowNull: true
    // }

});

module.exports = Post;