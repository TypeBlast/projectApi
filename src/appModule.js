const express = require('express');
const router = express.Router();

const userModule =  require('./user/user.module');
const authModule = require('./auth/auth.module');
const statesModule = require('./state/states.module');
const citiesModule = require('./city/city.module');
const addressesModule = require('./address/addresses.module');
const employersModule = require('./employers/employers.module');
const servicesModule = require('./services/services.module');
const petsModule = require('./pets/pets.module');
const categoriesModule = require('./categories/categories.module');
const speciesModule = require('./species/species.module');
const productsModule = require('./products/products.module');
const appointmentsModule = require('./appointments/appointments.module');
const cartsModule = require('./carts/carts.module');
const paymentsModule = require('./payments/payments.module')
const ordersModule = require('./orders/orders.module')

router.use('/user', userModule);
router.use('/auth', authModule);
router.use('/states', statesModule);
router.use('/cities', citiesModule);
router.use('/addresses', addressesModule);
router.use('/employers', employersModule);
router.use('/services', servicesModule);
router.use('/pets', petsModule);
router.use('/categories', categoriesModule);
router.use('/species', speciesModule);
router.use('/products', productsModule);
router.use('/appointments', appointmentsModule);
router.use('/carts', cartsModule);
router.use('/payments', paymentsModule)
router.use('/orders', ordersModule)

module.exports = router;
