const Sequelize = require("sequelize");

const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_DATABASE = process.env.MYSQL_DATABASE
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const DIALECT = process.env.DIALECT

const sequelize = new Sequelize(MYSQL_DATABASE,  MYSQL_USER, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        dialect:DIALECT
});

sequelize.sync({ alter: true });


module.exports = sequelize