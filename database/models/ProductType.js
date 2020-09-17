const { DataTypes } = require("sequelize");

const sequelize = require("../con");

module.exports = sequelize.define("product-type", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  isActive: DataTypes.INTEGER,
});
