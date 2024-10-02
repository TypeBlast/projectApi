'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('SenhaSegura123', 10); 

    await queryInterface.sequelize.query(`
      INSERT INTO users (name, email, password, phone, cpf, role) VALUES
      ('Admin', 'admin@example.com', '${hashedPassword}', '7777777777777', '99999999999', 'admin');
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM users WHERE email = 'admin@example.com';
    `);
  }
};
