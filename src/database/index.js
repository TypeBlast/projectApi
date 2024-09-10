const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');


const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

const sequelize = new Sequelize(config);

const User = require('../user/Entities/user.entity');
const States = require('../state/Entities/states.entity');
const Cities = require('../city/Entities/cities.entity');
const Addresses = require('../address/Entities/addresses.entity');
const Employer = require('../employers/Entities/employers.entity');
const Services = require('../services/Entities/services.entity')

User.init(sequelize);
States.init(sequelize);
Cities.init(sequelize);
Addresses.init(sequelize);
Employer.init(sequelize);
Services.init(sequelize);

States.hasMany(Cities, {
  foreignKey: 'state_id',
  as: 'cities'
});

Cities.belongsTo(States, {
  foreignKey: 'state_id',
  as: 'states'
});

Cities.hasMany(Addresses, {
  foreignKey: 'city_id',
  as: 'addresses'
});

Addresses.belongsTo(Cities, {
  foreignKey: 'city_id',
  as: 'cities'
});

User.hasMany(Addresses, {
  foreignKey: 'user_id',
  as: 'addresses'
});

Addresses.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado.'))
  .catch(error => console.error('Erro ao sincronizar o banco de dados:', error));

module.exports = {
  User,
  States,
  Cities,
  Addresses,
  Employer,
  Services,
  sequelize
};
