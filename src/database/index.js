
const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');


const User = require('../user/Entities/user.entity');
const States = require('../state/Entities/states.entity');
const Cities = require('../city/Entities/cities.entity'); 
const Addresses = require('../address/Entities/addresses.entity')


const sequelize = new Sequelize(databaseConfig);


User.init(sequelize);
States.init(sequelize);
Cities.init(sequelize);


States.hasMany(Cities, {
  foreignKey: 'state_id',
  as: 'cities'
});

Cities.belongsTo(States, {
  foreignKey: 'state_id',
  as: 'state'
});

Cities.hasMany(Addresses, {
    foreignKey: 'city_id',
    as: 'addresses'
  });
  
Addresses.belongsTo(Cities, {
    foreignKey: 'city_id',
    as: 'city'
  });
  
User.hasMany(Addresses, {
    foreignKey: 'user_id',
    as: 'addresses'
});
  
Addresses.belongsTo(Users, {
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
  sequelize
};
