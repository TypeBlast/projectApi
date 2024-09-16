const Sequelize = require('sequelize');

class Products extends Sequelize.Model {
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
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      species_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'species',
          key: 'id'
        }
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
    });

    return this;
  }

 
}

module.exports = Products;
