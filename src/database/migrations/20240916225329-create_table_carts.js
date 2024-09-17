'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      status: {
        type: Sequelize.ENUM('Aberto', 'Completo', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Aberto'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};
