'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('employers', { 
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
        phone: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true
        },
        position: { 
          type: Sequelize.STRING(255),
          allowNull: false
        },
        service_id: { 
          type: Sequelize.INTEGER,
          references: {
            model: 'services',
            key: 'id',
          },
        }
      });
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('employers');
     
  }
};

