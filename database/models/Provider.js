const { DataTypes } = require("sequelize");

const sequelize = require("../con");

const Provider = sequelize.define("provider", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    phone: DataTypes.STRING
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE,
  });

  module.exports = Provider;