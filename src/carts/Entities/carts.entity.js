const Sequelize = require('sequelize');

class Carts extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      }
    }, {
      sequelize,
      tableName: 'carts',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Carts;
