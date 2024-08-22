const Sequelize = require('sequelize');

/** @type {import('sequelize').Sequelize} */
class States extends Sequelize.Model {
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
          len: [3, 255],
        }
      },
      uf: {
        type: Sequelize.STRING(2),
        allowNull: false,
        validate: {
          len: [2, 2],
          isAlpha: true // Garante que o 'uf' contenha apenas letras
        }
      }
    }, {
      sequelize,
      timestamps: false
    });

    return this;
  }
}

module.exports = States;
