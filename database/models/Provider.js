const { DataTypes } = require("sequelize");

const sequelize = require("../connection");
const Product = require('../models/Product')

const Provider = sequelize.define("productProviders", {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  endereco: DataTypes.STRING,
  isActive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    values: [0, 1],
  },
});

Provider.hasMany(Product, { foreignKey: "provider" });


module.exports = Provider;
