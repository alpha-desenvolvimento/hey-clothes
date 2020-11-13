const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Product = require("./Product");

const User = sequelize.define("user", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    unique: {
      args: [true],
      msg: "Email já existente no banco de dados!",
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: [6, 20],
    },
  },
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
});

module.exports = User;
