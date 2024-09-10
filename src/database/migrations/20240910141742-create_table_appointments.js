'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
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
      service_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'services', 
          key: 'id' 
        },
      },
      employer_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employers', 
          key: 'id' 
        },
      },
      pet_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pets', 
          key: 'id'
        },
        appointment_date: { 
          type: Sequelize.DATEONLY, 
          allowNull: false
        },
        appointment_time: { 
          type: Sequelize.TIME, 
          allowNull: false
        }
    },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};

