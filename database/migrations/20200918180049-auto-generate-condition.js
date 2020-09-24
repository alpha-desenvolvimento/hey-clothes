"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert("productCondition", [
      {
        name: "Novo",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Semi-Novo",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Usado",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Precisa de reparos",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("productCondition", null, {});
  },
};
 