const sequelize = require('sequelize');
require('dotenv').config();


const database = new sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: "mysql"
});

database.authenticate()
    .then(() => console.log('connexion réussie'))

    .catch((error) => console.error('connection échouée'));


module.exports = database;