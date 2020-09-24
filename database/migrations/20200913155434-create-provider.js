"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "productProviders",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        endereco: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        isActive: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          values: [0, 1],
        },
      },
      { freezeTableName: true }
    );
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("productProviders");
  },
};
