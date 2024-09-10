'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      age: { 
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      specie: {
        type: Sequelize.ENUM('Cachorro', 'Gato'),
        allowNull: false
      },
      size: {
        type: Sequelize.ENUM('Pequeno', 'Médio', 'Grande'), 
        allowNull: false,
        defaultValue: 'Médio' 
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};
