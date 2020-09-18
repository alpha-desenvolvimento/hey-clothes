'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('provider', [
      {
      name: 'renner',
      phone:"11999999999",
    },
    {
      name: 'riachuelo',
      phone:"11999999999",
    },
    {
      name: 'C&A',
      phone:"11999999999",
    },]
    
    );

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('provider');
     
  }
};
