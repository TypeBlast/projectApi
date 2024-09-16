'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO categories (name) VALUES
      ('Higiene e Beleza'),
      ('Saúde'),
      ('Rações'),
      ('Petiscos'),
      ('Acessórios');
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM categories WHERE name IN
      ('Higiene e Beleza', 'Saúde', 'Rações', 'Petiscos', 'Acessórios');
    `);
  }
};
