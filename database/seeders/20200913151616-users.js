"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert("users", [
      {
        name: "Default Admin",
        email: "admin@heycloth.com",
        password: "hcAdmin",
        isActive: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Test user 1",
        email: "e@mail.com",
        password: "123456",
        isActive: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Gabriel",
        email: "gabriel@alpha.com",
        password: "123456",
        isActive: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Igor",
        email: "igor@alpha.com",
        password: "123456",
        isActive: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Isaac",
        email: "isaac@alpha.com",
        password: "123456",
        isActive: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Miguel",
        email: "miguel@alpha.com",
        password: "123456",
        isActive: 1,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
