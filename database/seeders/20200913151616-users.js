"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert("users", [
      {
        name: "Test user 1",
        email: "e@mail.com",
        pwd: "123456",
        isActive: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Test user 2",
        email: "e2@mail.com",
        pwd: "123456a",
        isActive: 0,
        createdAt: now,
        updatedAt: now
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
