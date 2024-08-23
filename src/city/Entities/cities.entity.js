const Sequelize = require('sequelize');

/** @type {import('sequelize').Sequelize} */
class Cities extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
        }
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'Cities',
      timestamps: false
    });


    return this;
  }
}

module.exports = Cities;
