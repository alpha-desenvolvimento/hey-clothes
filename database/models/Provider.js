const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const Provider = sequelize.define("productProviders", {
  // id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
});

module.exports = Provider;
