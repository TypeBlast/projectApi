'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
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
        },
      },
      complement: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cities', 
          key: 'id'       
        },
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'states', 
          key: 'id'
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
  }
};
