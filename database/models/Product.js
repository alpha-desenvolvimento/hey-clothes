const { DataTypes } = require("sequelize");

const sequelize = require("../connection");

const Product = sequelize.define(
  "products",
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    brand: DataTypes.STRING,
    provider: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    imgA: DataTypes.STRING,
    imgB: DataTypes.STRING,
    imgC: DataTypes.STRING,
    imgD: DataTypes.STRING,
    condition: DataTypes.INTEGER,
    recievedAt: { type: DataTypes.DATE, allowNull: true },
    soldAt: { type: DataTypes.DATE, allowNull: true },
    //
    isActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      values: [0, 1],
    },
    createdBy: {
      type: DataTypes.INTEGER,
      validate: {
        is: {
          args: [[null]],
          msg: "Informe o usuário responsável pelo produto",
        },
      },
    },
  },
  {
    hooks: {
      beforeUpdate: (prod) => {
        prod.isActive = prod.soldAt ? 0 : 1;
      },
      beforeCreate: (prod) => {
        prod.isActive = prod.soldAt ? 0 : 1;
      },
    },
  }
);

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

const Condition = sequelize.define("productCondition", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
});

Product.belongsTo(ProductCategory, { foreignKey: "category" });
Product.belongsTo(User, { foreignKey: "createdBy" });
Product.belongsTo(Provider, { foreignKey: "provider" });
Product.belongsTo(Condition, { foreignKey: "condition" });

module.exports = Product;
