'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO employers (name, phone, position, service_id) VALUES
      ('João da Silva', '5511999998888', 'Veterinário', 3),  
      ('Maria Oliveira', '5511988887777', 'Veterinária', 3), 
      ('Pedro Santos', '5511977776666', 'Veterinário', 4),  
      ('Ana Souza', '5511966665555', 'Banhista', 1),  
      ('Lucas Costa', '5511955554444', 'Tosador', 5),  
      ('Fernanda Almeida', '5511944443333', 'Banhista', 1),  
      ('Carlos Pereira', '5511933332222', 'Tosador', 5), 
      ('Juliana Martins', '5511922221111', 'Tosadora', 2),  
      ('Roberto Lima', '5511911110000', 'Banhista', 1);  
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
