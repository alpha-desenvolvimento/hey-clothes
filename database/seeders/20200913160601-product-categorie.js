"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("productCategories", [
      // Calça
      { name: "Jeans", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bermuda", createdAt: new Date(), updatedAt: new Date() },
      { name: "Mini short", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pijama", createdAt: new Date(), updatedAt: new Date() },
      { name: "Esportiva", createdAt: new Date(), updatedAt: new Date() },
      { name: "Social", createdAt: new Date(), updatedAt: new Date() },
      // Vestido
      { name: "Mini saia", createdAt: new Date(), updatedAt: new Date() },
      { name: "Gala", createdAt: new Date(), updatedAt: new Date() },
      { name: "Saia", createdAt: new Date(), updatedAt: new Date() },
      // Camisa
      { name: "Social", createdAt: new Date(), updatedAt: new Date() },
      { name: "Polo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Regata", createdAt: new Date(), updatedAt: new Date() },
      { name: "Baby look", createdAt: new Date(), updatedAt: new Date() },
      // Sapato
      { name: "Social", createdAt: new Date(), updatedAt: new Date() },
      { name: "Chinelo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sapatilha", createdAt: new Date(), updatedAt: new Date() },
      { name: "Salto alto", createdAt: new Date(), updatedAt: new Date() },
      { name: "Tênis", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sapatênis", createdAt: new Date(), updatedAt: new Date() },
      // Roupa intima
      { name: "Cueca", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calcinha", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sutiã", createdAt: new Date(), updatedAt: new Date() },
      { name: "Lingerie", createdAt: new Date(), updatedAt: new Date() },
      // Acessório
      { name: "Colar", createdAt: new Date(), updatedAt: new Date() },
      { name: "Brinco", createdAt: new Date(), updatedAt: new Date() },
      { name: "Relógio", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pulseira", createdAt: new Date(), updatedAt: new Date() },
      { name: "Anel", createdAt: new Date(), updatedAt: new Date() },
      { name: "Cinta", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product-categories", null, {});
  },
};
