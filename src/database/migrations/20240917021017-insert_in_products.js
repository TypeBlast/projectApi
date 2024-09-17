'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Shampoo para Cães',
        description: 'Shampoo especial para cães de todas as raças',
        category_id: 1, 
        species_id: 1, 
        price: 29.90,
        stock: 50,
        url: 'https://exemplo.com/produtos/shampoo-cachorros',
      },
      {
        name: 'Ração Premium para Gatos',
        description: 'Ração premium com ingredientes selecionados para gatos adultos',
        category_id: 3, 
        species_id: 2, 
        price: 99.90,
        stock: 120,
        url: 'https://exemplo.com/produtos/racao-gatos-premium',
      },
      {
        name: 'Coleira Anti-pulgas',
        description: 'Coleira ajustável com proteção de 6 meses contra pulgas',
        category_id: 5, 
        species_id: 1, 
        price: 45.00,
        stock: 30,
        url: 'https://exemplo.com/produtos/coleira-antipulgas',
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
