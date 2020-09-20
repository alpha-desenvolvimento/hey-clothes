const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const Product = sequelize.define("products", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.DECIMAL,
  brand: DataTypes.STRING, //todo atualizar documento
  category: DataTypes.INTEGER,
  provider: DataTypes.INTEGER,
  imgA: DataTypes.STRING,
  imgB: DataTypes.STRING,
  imgC: DataTypes.STRING,
  imgD: DataTypes.STRING,
  createdBy: {
    type: DataTypes.INTEGER,
    validate: {
      allowNull: {
        args: [[false]],
        msg: "Informe o usuário responsável pelo produto",
      },
    },
  },
});

//TODO ARRUMAR ESSA PORRA
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
});

const ProductCategory = sequelize.define("productCategories", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
});

const Provider = sequelize.define("productProviders", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
});

Product.belongsTo(ProductCategory, { foreignKey: "category" });
Product.belongsTo(User, { foreignKey: "createdBy" });
Product.belongsTo(Provider, { foreignKey: "provider" });

module.exports = Product;
