const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductCategory = require("./ProductCategory");

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.DECIMAL,
  brand: DataTypes.STRING,//todo atualizar documento
  category: DataTypes.INTEGER,
  imgA: DataTypes.STRING,
  imgB: DataTypes.STRING,
  imgC: DataTypes.STRING,
  imgD: DataTypes.STRING
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE,
});


Product.belongsTo(ProductCategory, {
  foreignKey: 'productCategories'
});


module.exports = Product;
