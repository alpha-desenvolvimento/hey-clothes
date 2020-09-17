const { DataTypes } = require("sequelize");

const sequelize = require("../con");

module.exports = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  user: DataTypes.STRING,
  pwd: DataTypes.STRING,
  isActive: DataTypes.INTEGER,
});
