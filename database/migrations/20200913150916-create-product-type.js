"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("product-type", {
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
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        values: [0, 1],
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("product-type");
  },
};
