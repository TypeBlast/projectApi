const Sequelize = require('sequelize');

class Order_items extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'order_items',
      timestamps: false
    });
    return this;
  }

  
}

module.exports = Order_items;
