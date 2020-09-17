"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("product-categories", [
      // Calça
      { productType: 1, name: "Jeans" },
      { productType: 1, name: "Bermuda" },
      { productType: 1, name: "Mini short" },
      { productType: 1, name: "Pijama" },
      { productType: 1, name: "Esportiva" },
      { productType: 1, name: "Social" },
      // Vestido
      { productType: 2, name: "Mini saia" },
      { productType: 2, name: "Gala" },
      { productType: 2, name: "Saia" },
      // Camisa
      { productType: 3, name: "Social" },
      { productType: 3, name: "Polo" },
      { productType: 3, name: "Regata" },
      { productType: 3, name: "Baby look" },
      // Sapato
      { productType: 4, name: "Social" },
      { productType: 4, name: "Chinelo" },
      { productType: 4, name: "Sapatilha" },
      { productType: 4, name: "Salto alto" },
      { productType: 4, name: "Tênis" },
      { productType: 4, name: "Sapatênis" },
      // Roupa intima
      { productType: 4, name: "Cueca" },
      { productType: 4, name: "Calcinha" },
      { productType: 4, name: "Sutiã" },
      { productType: 4, name: "Lingerie" },
      // Acessório
      { productType: 5, name: "Colar" },
      { productType: 5, name: "Brinco" },
      { productType: 5, name: "Relógio" },
      { productType: 5, name: "Pulseira" },
      { productType: 5, name: "Anel" },
      { productType: 5, name: "Cinta" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product-categories", null, {});
  },
};
