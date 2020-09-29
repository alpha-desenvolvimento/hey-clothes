const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connection");

module.exports = {
  sequelize,
  models: {
    User: require("./User"),
    ProductCategory: require("./ProductCategory"),
    Provider: require("./Provider"),
    Product: require("./Product"),
    ProductListed: require("./ProductListed"),
    ProductCondition: require("./ProductCondition"),
    UserPasswordToken: require("./UserPasswordToken"),
  },
};
