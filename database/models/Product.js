const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductCategory = require("./ProductCategory");
const User = require("./User");

const Product = sequelize.define("products", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.DECIMAL,
  brand: DataTypes.STRING, //todo atualizar documento
  category: DataTypes.INTEGER,
  imgA: DataTypes.STRING,
  imgB: DataTypes.STRING,
  imgC: DataTypes.STRING,
  imgD: DataTypes.STRING,
  createdBy: DataTypes.INTEGER,
});

Product.belongsTo(ProductCategory, {
  foreignKey: "category",
});
Product.belongsTo(User, {
  foreignKey: "createdBy",
});

module.exports = Product;
