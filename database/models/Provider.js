const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const Provider = sequelize.define("productProviders", {
  // id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  endereco: DataTypes.STRING,
  isActive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    values: [0, 1],
  },
});

module.exports = Provider;
