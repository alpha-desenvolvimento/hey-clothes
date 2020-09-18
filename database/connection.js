// require("dotenv-safe").config();
const { Sequelize, DataTypes } = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});
