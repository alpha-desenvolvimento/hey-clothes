const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const UserPasswordToken = sequelize.define("userPasswordTokens", {
  token: DataTypes.INTEGER,
  expiration: DataTypes.STRING(10),
},{
  timestamps: false
});

UserPasswordToken.removeAttribute('id');


module.exports = UserPasswordToken;
