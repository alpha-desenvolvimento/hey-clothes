"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("product-categories", [
      // Calça
      { productType: 1, name: "Jeans",createdAt:new Date(),updatedAt:new Date() },
      { productType: 1, name: "Bermuda",createdAt:new Date(),updatedAt:new Date() },
      { productType: 1, name: "Mini short",createdAt:new Date(),updatedAt:new Date() },
      { productType: 1, name: "Pijama" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 1, name: "Esportiva" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 1, name: "Social" ,createdAt:new Date(),updatedAt:new Date()},
      // Vestido
      { productType: 2, name: "Mini saia" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 2, name: "Gala" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 2, name: "Saia" ,createdAt:new Date(),updatedAt:new Date()},
      // Camisa
      { productType: 3, name: "Social" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 3, name: "Polo" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 3, name: "Regata" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 3, name: "Baby look" ,createdAt:new Date(),updatedAt:new Date()},
      // Sapato
      { productType: 4, name: "Social" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Chinelo" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Sapatilha" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Salto alto" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Tênis" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Sapatênis" ,createdAt:new Date(),updatedAt:new Date()},
      // Roupa intima
      { productType: 4, name: "Cueca" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Calcinha" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Sutiã" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 4, name: "Lingerie" ,createdAt:new Date(),updatedAt:new Date()},
      // Acessório
      { productType: 5, name: "Colar" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 5, name: "Brinco" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 5, name: "Relógio" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 5, name: "Pulseira" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 5, name: "Anel" ,createdAt:new Date(),updatedAt:new Date()},
      { productType: 5, name: "Cinta" ,createdAt:new Date(),updatedAt:new Date()},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product-categories", null, {});
  },
};
