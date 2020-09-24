//todo atualizar imagens
"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sku: {
        type: DataTypes.STRING,
        unique: true,
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        values: [0, 1],
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      category: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "productCategories", key: "id" },
      },
      provider: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { model: "productProviders", key: "id" },
      },
      condition: {
        allowNull: true,
        default: 1,
        type: DataTypes.INTEGER,
        references: { model: "productCondition", key: "id" },
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      brand: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      imgA: { allowNull: true, type: DataTypes.STRING },
      imgB: { allowNull: true, type: DataTypes.STRING },
      imgC: { allowNull: true, type: DataTypes.STRING },
      imgD: { allowNull: true, type: DataTypes.STRING },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("products");
  },
};
