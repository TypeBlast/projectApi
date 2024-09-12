const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { DataTypes } = Sequelize;

class User extends Sequelize.Model {
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
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255],
          containsAtLeastOneNumber(value) {
            if (!/\d/.test(value)) {
              throw new Error('A senha deve conter pelo menos um número.');
            }
          },
          containsAtLeastOneUpperCaseLetter(value) {
            if (!/[A-Z]/.test(value)) {
              throw new Error('A senha deve conter pelo menos uma letra maiúscula.');
            }
          },
          containsAtLeastOneLowerCaseLetter(value) {
            if (!/[a-z]/.test(value)) {
              throw new Error('A senha deve conter pelo menos uma letra minúscula.');
            }
          }
        }
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{11}$/
        }
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_token_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = bcrypt.genSaltSync();
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      },
    });

    return this;
  }

  async verifyPassword(passwordEntered) {
    return await bcrypt.compare(passwordEntered, this.password);
  }
}

module.exports = User;
