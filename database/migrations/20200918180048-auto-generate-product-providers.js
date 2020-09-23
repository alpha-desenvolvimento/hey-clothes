"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("productProviders", [
      {
        name: "Dona Rafaela do Orfanato",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Padre José da Santa Clara",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "João Rafael e Fernandis Roupas",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clube Social Esportivo",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "SOS Roupas Usadas",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "M&G Confecções",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Centro Espírita SP",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Casas Bruno Santos",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sales Fundation",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Elaine - Mais Modas do Brasil",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Minas Conexão",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adriana Representante Braz",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Torra Torra",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lojão do Bráz",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Brechó do Pequeno",
        phone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Exército de Salvação",
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
