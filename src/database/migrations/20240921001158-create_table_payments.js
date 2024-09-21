'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id'
        }
      },
      cart_items_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cart_items',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      payment_method: {
        type: Sequelize.ENUM('Cartão de Débito', 'Cartão de Crédito', 'Boleto', 'Pix'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Pendente', 'Aprovado', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Pendente'
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
