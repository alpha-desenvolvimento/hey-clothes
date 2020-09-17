const { DataTypes } = require("sequelize");

const sequelize = require("../con");

const ProductType = require("./ProductType");

const ProductCategory = sequelize.define("product-categories", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  productType: {
    type: DataTypes.INTEGER,
    references: "product-type",
    referencesKey: "id",
  },
  name: DataTypes.STRING,
});

ProductCategory.belongsTo(ProductType, {
  foreignKey: "productType",
});

module.exports = ProductCategory;
