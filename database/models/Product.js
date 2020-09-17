const { DataTypes } = require("sequelize");

const sequelize = require("../con");

const ProductCategory = require("./ProductCategory");

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  branch: DataTypes.STRING,
  category: DataTypes.INTEGER,
  imgA: DataTypes.STRING,
  imgB: DataTypes.STRING,
  imgC: DataTypes.STRING,
  imgD: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});


Product.belongsTo(ProductCategory, {
  foreignKey: 'category'
});


module.exports = Product;
