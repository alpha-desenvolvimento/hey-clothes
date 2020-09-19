const { DataTypes } = require("sequelize");

const sequelize = require("../connection");



const ProductCategory = sequelize.define("productCategories", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  description: DataTypes.STRING
});

// ProductCategory.belongsTo(ProductType, {
//   foreignKey: "productType",
// });

module.exports = ProductCategory;
