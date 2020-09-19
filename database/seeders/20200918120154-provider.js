"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("productProviders", [
      {
        name: "renner",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "riachuelo",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C&A",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("provider");
  },
};
