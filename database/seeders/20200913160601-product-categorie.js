"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("productCategories", [
      // Blusas
      { name: "Blusa Básica manga-curta", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Básica manga-longa", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Bata", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusinha", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Body", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Manga 3/4", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Manga Longa ", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Moletom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Ombro a Ombro", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Pedraria e Aplicações ", createdAt: new Date(), updatedAt: new Date() },
      { name: "Blusa Regata", createdAt: new Date(), updatedAt: new Date() },

      // Camisas
      { name: "Camisa manga-curta", createdAt: new Date(), updatedAt: new Date() },
      { name: "Camisa manga-longa", createdAt: new Date(), updatedAt: new Date() },
      { name: "Camisa Regata", createdAt: new Date(), updatedAt: new Date() },
      { name: "Camisa Social", createdAt: new Date(), updatedAt: new Date() },
      { name: "Camisa Social", createdAt: new Date(), updatedAt: new Date() },

      // Camisetas
      { name: "Polo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Camiseta", createdAt: new Date(), updatedAt: new Date() },
      { name: "Camiseta Fitness", createdAt: new Date(), updatedAt: new Date() },
      { name: "Baby look", createdAt: new Date(), updatedAt: new Date() },

      // Vestidos
      { name: "Vestido Longo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Vestido Médio", createdAt: new Date(), updatedAt: new Date() },
      { name: "Vestido Mini", createdAt: new Date(), updatedAt: new Date() },
      { name: "Vestidos de Festa", createdAt: new Date(), updatedAt: new Date() },

      // Saias
      { name: "Saia Longa", createdAt: new Date(), updatedAt: new Date() },
      { name: "Saia Média", createdAt: new Date(), updatedAt: new Date() },
      { name: "Saia Mini", createdAt: new Date(), updatedAt: new Date() },
      { name: "Saia Sino", createdAt: new Date(), updatedAt: new Date() },
      { name: "Saia Fitness", createdAt: new Date(), updatedAt: new Date() },

      // Casacos
      { name: "Casaco", createdAt: new Date(), updatedAt: new Date() },
      { name: "Casaco Jeans", createdAt: new Date(), updatedAt: new Date() },
      { name: "Casaco Crochê", createdAt: new Date(), updatedAt: new Date() },
      { name: "Casaco Couro", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bomber", createdAt: new Date(), updatedAt: new Date() },
      { name: "Cardigan", createdAt: new Date(), updatedAt: new Date() },
      { name: "Brazer", createdAt: new Date(), updatedAt: new Date() },
      { name: "Colete", createdAt: new Date(), updatedAt: new Date() },
      { name: "Jaqueta", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sobretudo", createdAt: new Date(), updatedAt: new Date() },

      // Macacão
      { name: "Macacão Longo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Macacão Curto", createdAt: new Date(), updatedAt: new Date() },
      { name: "Macacão Alfaiataria", createdAt: new Date(), updatedAt: new Date() },

      // Shorts
      { name: "Short", createdAt: new Date(), updatedAt: new Date() },
      { name: "Short Jeans", createdAt: new Date(), updatedAt: new Date() },
      { name: "Short Fitness", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bermuda", createdAt: new Date(), updatedAt: new Date() },      

      // Mada Praia
      { name: "Biquíni", createdAt: new Date(), updatedAt: new Date() },
      { name: "Maiô", createdAt: new Date(), updatedAt: new Date() },
      { name: "Saída de Praia", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sunga", createdAt: new Date(), updatedAt: new Date() },

      // Calças
      { name: "Calça ", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça  Jeans", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Social", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Capri", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Couro", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Cigarrete", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Boxer", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Legging", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Sarja", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Reta", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Sarouel", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Veludo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Cintura Alta", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Cintura Baixa", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Cintura Média", createdAt: new Date(), updatedAt: new Date() },
      { name: "Calça Fitness", createdAt: new Date(), updatedAt: new Date() },

      // Conjunto
      { name: "Conjunto", createdAt: new Date(), updatedAt: new Date() },

      // Sapato
      { name: "Social", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sapatilha", createdAt: new Date(), updatedAt: new Date() },
      { name: "Salto alto", createdAt: new Date(), updatedAt: new Date() },
      { name: "Tênis", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sapatênis", createdAt: new Date(), updatedAt: new Date() },
      { name: "Chinelo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bota", createdAt: new Date(), updatedAt: new Date() },
      { name: "Rasteirinha", createdAt: new Date(), updatedAt: new Date() },

      // Roupa intima
      { name: "Cueca", createdAt: new Date(), updatedAt: new Date() },
      { name: "Cueca Box", createdAt: new Date(), updatedAt: new Date() },
      { name: "Cueca Samba Canção", createdAt: new Date(), updatedAt: new Date() },
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
      { name: "Bolsa", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bolsa Maxi", createdAt: new Date(), updatedAt: new Date() },
      { name: "Mochila", createdAt: new Date(), updatedAt: new Date() },
      { name: "Necessaire", createdAt: new Date(), updatedAt: new Date() },


    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product-categories", null, {});
  },
};
