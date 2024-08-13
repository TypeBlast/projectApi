const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const configDatabase = require('./database/index');

class AppController {
    constructor()
    {
        this.express = express();
        this.middlewares();
        this.router();
    }
    middlewares(){
        this.express.use(express.json());
    }

    router()
    {
        this.express.use('/petshopApi', require('./appModule'));
    }

}

function createApiController(){
    return new AppController();
}

const app = createApiController().express;

module.exports = app;