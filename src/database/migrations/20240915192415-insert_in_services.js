'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO services (name, description, price, duration) VALUES
      ('Banho Completo', 'Serviço completo de banho para cães e gatos.', 150.00, '60 minutos'),
      ('Corte de Unhas', 'Serviço de corte de unhas para cães e gatos.', 30.00, '15 minutos'),
      ('Consulta Veterinária', 'Consulta geral com um veterinário.', 200.00, '45 minutos'),
      ('Vacinação', 'Aplicação de vacinas para cães e gatos.', 100.00, '30 minutos'),
      ('Tosa Higiênica', 'Serviço de tosa higiênica para cães e gatos.', 80.00, '40 minutos');
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM services WHERE name IN
      ('Banho Completo', 'Corte de Unhas', 'Consulta Veterinária', 'Vacinação', 'Tosa Higiênica');
    `);
  }
};
