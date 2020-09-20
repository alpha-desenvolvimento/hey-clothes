const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const ProductCategory = sequelize.define("productCategories", {
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
  name: DataTypes.STRING,
});

module.exports = ProductCategory;
