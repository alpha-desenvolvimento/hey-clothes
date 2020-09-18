const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
// });

const sequelize = require("../con");

// const User = sequelize.define('user', {
//   name: DataTypes.STRING,
//   user: DataTypes.STRING,
//   pwd: DataTypes.STRING,
//   isActive: DataTypes.INTEGER
// })

module.exports = {
  sequelize,
  database: {
    User: require("./User"),
    ProductCategory: require("./ProductCategory"),
    Provider: require('./Provider'),
    Product: require("./Product"),
    ProductListed: require("./ProductListed"),
  },
};
