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
const Services = require('../services/Entities/services.entity');
const Pets = require('../pets/Entities/pets.entity');
const Products = require('../products/Entities/products.entity');
const Categories = require('../categories/Entities/categories.entity');
const Species = require('../species/Entities/species.entity');
const Appointments = require('../appointments/Entities/appointments.entity');
const Carts = require('../carts/Entities/carts.entity');
const Cart_items = require('../carts/Entities/cart_items.entity');
const Payments = require('../payments/Entities/payments.entity');
const Orders = require('../orders/Entities/orders.entity')
const Order_items = require('../orders/Entities/order_items.entity')


User.init(sequelize);
States.init(sequelize);
Cities.init(sequelize);
Addresses.init(sequelize);
Employer.init(sequelize);
Services.init(sequelize);
Pets.init(sequelize);
Products.init(sequelize);
Categories.init(sequelize);
Species.init(sequelize);
Appointments.init(sequelize);
Carts.init(sequelize);
Cart_items.init(sequelize);
Payments.init(sequelize);
Orders.init(sequelize);
Order_items.init(sequelize);


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
  as: 'users'
});

Products.belongsTo(Categories, {
   foreignKey: 'category_id',
    as: 'categories'
});

Products.belongsTo(Species, {
   foreignKey: 'species_id',
    as: 'species'
});

Categories.hasMany(Products, {
   foreignKey: 'category_id',
    as: 'products'
});

Species.hasMany(Products, {
   foreignKey: 'species_id',
    as: 'products' 
});

User.hasMany(Appointments, {
    foreignKey: 'user_id',
     as: 'appointments' 
});

Services.hasMany(Appointments, {
    foreignKey: 'service_id',
     as: 'appointments' 
});

Employer.hasMany(Appointments, {
    foreignKey: 'employer_id',
     as: 'appointments' 
});

Pets.hasMany(Appointments, {
    foreignKey: 'pet_id',
     as: 'appointments' 
});

Appointments.belongsTo(User, 
  { foreignKey: 'user_id',
     as: 'users' 
});

Appointments.belongsTo(Services, {
   foreignKey: 'service_id',
    as: 'services' 
});

Appointments.belongsTo(Employer, {
   foreignKey: 'employer_id',
    as: 'employers' 
});

Appointments.belongsTo(Pets, {
   foreignKey: 'pet_id',
    as: 'pets' 
});

Pets.belongsTo(User, {
   foreignKey: 'user_id',
    as: 'users' 
});

User.hasMany(Pets, {
   foreignKey: 'user_id',
    as: 'pets' 
});

User.hasMany(Carts, {
   foreignKey: 'user_id',
    as: 'carts' 
});

Carts.belongsTo(User, {
   foreignKey: 'user_id',
    as: 'users' 
});

Carts.hasMany(Cart_items, {
   foreignKey: 'cart_id',
    as: 'cart_items' 
});

Cart_items.belongsTo(Carts, {
   foreignKey: 'cart_id',
    as: 'carts' 
});

Products.hasMany(Cart_items, {
   foreignKey: 'product_id',
    as: 'cart_items' 
});

Cart_items.belongsTo(Products, {
   foreignKey: 'product_id',
    as: 'products' 
});

Services.hasMany(Employer, {
  foreignKey: 'serviceId',
});

Employer.belongsTo(Services, {
  foreignKey: 'serviceId',
});

Orders.belongsTo(User, {
   foreignKey: 'user_id',
    as: 'users' 
});

User.hasMany(Orders, {
   foreignKey: 'user_id',
    as: 'orders' 
});

Orders.belongsTo(Payments, {
   foreignKey: 'payment_id',
    as: 'payments' 
});

Payments.hasOne(Orders, {
   foreignKey: 'payment_id',
    as: 'orders' 
});

Orders.belongsTo(Addresses, {
   foreignKey: 'address_id',
    as: 'addresses' 
});

Addresses.hasMany(Orders, {
   foreignKey: 'address_id',
    as: 'orders' 
});

Order_items.belongsTo(Orders, {
   foreignKey: 'order_id',
    as: 'orders' 
});

Orders.hasMany(Order_items, {
   foreignKey: 'order_id',
    as: 'order_items' 
});

Order_items.belongsTo(Products, {
   foreignKey: 'product_id',
    as: 'products' 
});

Products.hasMany(Order_items, {
   foreignKey: 'product_id',
    as: 'order_items' 
});

Payments.belongsTo(User, {
   foreignKey: 'user_id',
    as: 'users' 
});

User.hasMany(Payments, {
   foreignKey: 'user_id',
    as: 'payments' 
});

Payments.belongsTo(Carts, {
   foreignKey: 'cart_id',
    as: 'carts' 
});

Carts.hasMany(Payments, {
   foreignKey: 'cart_id',
    as: 'payments' 
});

Addresses.belongsTo(States, {
   foreignKey: 'state_id' });

States.hasMany(Addresses, {
   foreignKey: 'state_id' });


/* Método de cardinalidade dentro
 do código para a relação de tabelas
onde hasMany significa 'Tem muitos' 
enquanto belongsTo significa 'Pertence' */



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
  Pets,
  Products,
  Categories,
  Species,
  Appointments,
  Carts,
  Cart_items,
  Payments,
  Orders,
  Order_items,
  sequelize
};
