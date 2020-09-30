const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductCondition = sequelize.define(
  "productCondition",
  {
    // id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = ProductCondition;
