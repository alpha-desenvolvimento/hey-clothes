const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const Product = require('../models/Product')

const ProductCategory = sequelize.define("productCategories", {
  isActive: {
    type: DataTypes.INTEGER,
    // defaultValue: 1,
    validate: {
      isIn: {
        args: [[0, 1]],
        msg: "Informe um valor válido para status ativo",
      },
    },
  },
  name: DataTypes.STRING,
});

ProductCategory.hasMany(Product, { foreignKey: "category" });

module.exports = ProductCategory;
