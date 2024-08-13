const sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const User = require('../user/Entities/user.entity');

const models = [
    User
];

const connection = new sequelize.Sequelize(databaseConfig);

models.forEach(model => model.init(connection))