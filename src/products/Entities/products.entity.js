const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
        }
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      species: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        }
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: 'products',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Product;
