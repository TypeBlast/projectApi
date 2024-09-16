'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO employers (name, phone, position) VALUES
      ('João da Silva', '5511999998888', 'Recepcionista'),
      ('Maria Oliveira', '5511988887777', 'Veterinária'),
      ('Pedro Santos', '5511977776666', 'Tratador'),
      ('Ana Souza', '5511966665555', 'Gerente'),
      ('Lucas Costa', '5511955554444', 'Estagiário'),
      ('Fernanda Almeida', '5511944443333', 'Auxiliar Administrativo'),
      ('Carlos Pereira', '5511933332222', 'Zelador'),
      ('Juliana Martins', '5511922221111', 'Assistente de Marketing'),
      ('Roberto Lima', '5511911110000', 'Supervisor de Vendas');
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM employers WHERE name IN
      ('João da Silva', 'Maria Oliveira', 'Pedro Santos', 'Ana Souza', 'Lucas Costa', 
       'Fernanda Almeida', 'Carlos Pereira', 'Juliana Martins', 'Roberto Lima');
    `);
  }
};
