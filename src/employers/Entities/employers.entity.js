const Sequelize = require('sequelize');

class Employer extends Sequelize.Model {
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
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{10,20}$/
        }
      },
      position: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [2, 255],
        }
      },
      service_id: {  
        type: Sequelize.INTEGER,
        references: {
          model: 'services',
          key: 'id',
        },
      }
    }, {
      sequelize,
      tableName: 'employers',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Employer