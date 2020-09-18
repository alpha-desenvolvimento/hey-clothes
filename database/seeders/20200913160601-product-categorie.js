"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("product-categories", [
      // Calça
      {  description: "Jeans",createdAt:new Date(),updatedAt:new Date() },
      {  description: "Bermuda",createdAt:new Date(),updatedAt:new Date() },
      {  description: "Mini short",createdAt:new Date(),updatedAt:new Date() },
      {  description: "Pijama" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Esportiva" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Social" ,createdAt:new Date(),updatedAt:new Date()},
      // Vestido
      {  description: "Mini saia" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Gala" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Saia" ,createdAt:new Date(),updatedAt:new Date()},
      // Camisa
      {  description: "Social" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Polo" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Regata" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Baby look" ,createdAt:new Date(),updatedAt:new Date()},
      // Sapato
      {  description: "Social" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Chinelo" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Sapatilha" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Salto alto" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Tênis" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Sapatênis" ,createdAt:new Date(),updatedAt:new Date()},
      // Roupa intima
      {  description: "Cueca" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Calcinha" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Sutiã" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Lingerie" ,createdAt:new Date(),updatedAt:new Date()},
      // Acessório
      {  description: "Colar" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Brinco" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Relógio" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Pulseira" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Anel" ,createdAt:new Date(),updatedAt:new Date()},
      {  description: "Cinta" ,createdAt:new Date(),updatedAt:new Date()},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product-categories", null, {});
  },
};
