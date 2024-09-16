'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO species (name) VALUES
      ('Cachorro'),
      ('Gato'),
      ('Coelho'),
      ('Peixe'),
      ('Pássaro'),
      ('Tartaruga'),
      ('Hamster');
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM species WHERE name IN
      ('Cachorro', 'Gato', 'Coelho', 'Peixe', 'Pássaro', 'Tartaruga', 'Hamster');
    `);
  }
};
