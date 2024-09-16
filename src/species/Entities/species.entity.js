const Sequelize = require('sequelize');

class Species extends Sequelize.Model {
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
      tableName: 'species',
    });

    return this;
  }
}

module.exports = Species;
