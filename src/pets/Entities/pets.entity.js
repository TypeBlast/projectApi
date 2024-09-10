const Sequelize = require('sequelize');

class Pets extends Sequelize.Model {
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
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      specie: {
        type: Sequelize.ENUM('Cachorro', 'Gato'),
        allowNull: false
      },
      size: {
        type: Sequelize.ENUM('Pequeno', 'Médio', 'Grande'),
        allowNull: false,
        defaultValue: 'Médio'
      }
    }, {
      sequelize,
      tableName: 'pets',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Pets;
