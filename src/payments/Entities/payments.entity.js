const Sequelize = require('sequelize');

class Payments extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM('Cartão de Débito', 'Cartão de Crédito', 'Boleto', 'Pix'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM( 'Pendente', 'Aprovado', 'Cancelado' ),
        allowNull: false,
        defaultValue: 'Pendente',
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: true,
	    defaultValue: Sequelize.NOW
      },
    }, {
      sequelize,
      tableName: 'payments',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Payments;

