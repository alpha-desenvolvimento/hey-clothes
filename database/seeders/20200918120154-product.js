'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('products', [{
      name: 'Calça Masculina Cinza',
      category:1,
      price: 99.90,
      branch: 'renner',
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: 'Conjunto Pijama Marvel',
      category:1,
      price: 59.90,
      branch: 'renner',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Sapato Social',
      category:4,
      price: 159.90,
      branch: 'renner',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Relógio Casio',
      category:1,
      price: 329.90,
      branch: 'renner',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    
    );

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('products');
     
  }
};
