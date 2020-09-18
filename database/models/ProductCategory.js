const { DataTypes } = require("sequelize");

const sequelize = require("../con");



const ProductCategory = sequelize.define("product-categories", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  description: DataTypes.STRING
});

// ProductCategory.belongsTo(ProductType, {
//   foreignKey: "productType",
// });

module.exports = ProductCategory;
