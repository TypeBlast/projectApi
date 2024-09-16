const Sequelize = require('sequelize');

class Categories extends Sequelize.Model {
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
      }
    }, {
      sequelize,
      tableName: 'categories',
    });

    return this;
  }
}

module.exports = Categories;
