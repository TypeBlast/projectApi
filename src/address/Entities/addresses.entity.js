const Sequelize = require('sequelize');

/** @type {import('sequelize').Sequelize} */
class Addresses extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'users',
          key: 'id'
        }
      },
      complement: {
        type: Sequelize.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255] 
        }
      },
      number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true 
        }
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: true, 
          is: {
            args: /^[0-9]+$/, 
            msg: ' O CEP deve conter apenas números.'
          },
          len: [8, 10] 
        }
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'Addresses',
      timestamps: false
    });

    return this;
  }
}

module.exports = Addresses;
