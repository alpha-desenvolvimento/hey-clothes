'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {

    await queryInterface.createTable('provider',
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
        phone: {
          allowNull: false,
          type: DataTypes.STRING,
        }
      }
    );

  },

  down: async (queryInterface, DataTypes) => {


    await queryInterface.dropTable('provider');

  }
};
