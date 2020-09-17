"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("product-type", [
      { name: "Calça" },
      { name: "Vestido" },
      { name: "Camisa" },
      { name: "Sapato" },
      { name: "Roupa intima" },
      { name: "Acessório" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product-type", null, {});
  },
};
