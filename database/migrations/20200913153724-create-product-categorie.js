
"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("product-categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // productType: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: { model: "product-type", key: "id" },
      // },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isActive: {//todo atualizar documento
        type: DataTypes.INTEGER,
        defaultValue: 1,
        values: [0, 1],
      },
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
    return queryInterface.dropTable("product-categorie");
  },
};
