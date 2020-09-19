const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductCategory = sequelize.define("productCategories", {
  // id: { type: DataTypes.INTEGER, primaryKey: true },
  isActive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: {
        args: [[0, 1]],
        msg: "Informe um valor válido para status ativo",
      },
    },
  },
  description: DataTypes.STRING,
});

// ProductCategory.belongsTo(ProductType, {
//   foreignKey: "productType",
// });

module.exports = ProductCategory;
