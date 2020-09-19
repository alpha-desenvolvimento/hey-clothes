const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductListed = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  imgA: DataTypes.STRING,
});

module.exports = ProductListed;
