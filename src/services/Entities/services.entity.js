const Sequelize = require('sequelize');

class Service extends Sequelize.Model {
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
          len: [3, 255],
        }
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [10, 255],
        }
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0.01,
        }
      },
      duration: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [5, 255],
        }
      }
    }, {
      sequelize,
      tableName: 'services',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Service;
