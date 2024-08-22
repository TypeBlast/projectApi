const sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const User = require('../user/Entities/user.entity');
const States = require('../state/Entities/states.entity')

const models = [
    User, States
];

const connection = new sequelize.Sequelize(databaseConfig);

models.forEach(model => model.init(connection))