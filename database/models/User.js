const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

module.exports = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,//TODO atualizar username para name no documento
  user: DataTypes.STRING,//todo vira email
  password: DataTypes.STRING,
  isActive: DataTypes.INTEGER,
});
