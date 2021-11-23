const { DataTypes } = require("sequelize");
const dataBase = require("./connection");

const Likes = dataBase.define("Likes",
    {
        likes: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

module.exports = Likes;