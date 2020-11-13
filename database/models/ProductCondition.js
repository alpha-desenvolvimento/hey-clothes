const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductCondition = sequelize.define(
  "productCondition",
  {
    name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = ProductCondition;
