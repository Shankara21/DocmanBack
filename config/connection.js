const Sequelize = require("sequelize");
require("dotenv").config();
const config = require("./config");

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

// const docman = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: DB_DIALECT,
//   logging: false,
// });
const docman = new Sequelize(
  config.prod.database,
  config.prod.username,
  config.prod.password,
  config.prod
);

module.exports = { docman };
