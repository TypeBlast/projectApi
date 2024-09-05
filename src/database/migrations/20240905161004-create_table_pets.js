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
      species: { 
        type: Sequelize.STRING(255),
        allowNull: false
      },
      pedigree: { 
        type: Sequelize.STRING(255),
        allowNull: true
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
        },
      },
     });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pets');
  
  }
};
