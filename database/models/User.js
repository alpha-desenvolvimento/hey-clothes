const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Product = require("./Product");

const User = sequelize.define("user", {
  name: DataTypes.STRING, //TODO atualizar username para name no documento
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
      min: {
        args: 6,
        msg: "Senha deve contar pelo menos 6 caracteres.",
      },
      max: {
        args: 20,
        msg: "Senha deve contar no máximo 20 caracteres.",
      },
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

User.hasMany(Product, { as: "createdProducts" });

module.exports = User;
