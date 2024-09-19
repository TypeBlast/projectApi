'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('services', {
       id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),  
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING(255), 
        allowNull: false
       }
       });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('services');
     
  }
};
