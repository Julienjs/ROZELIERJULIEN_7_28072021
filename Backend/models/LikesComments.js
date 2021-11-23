const { DataTypes } = require("sequelize");
const dataBase = require("./connection");

const LikesComments = dataBase.define("LikesComments",
    {

    });

module.exports = LikesComments;