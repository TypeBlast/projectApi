const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa o middleware CORS

dotenv.config();

const configDatabase = require('./database/index');

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.router();
    }

    middlewares() {
        this.express.use(cors()); // Habilita CORS para todas as rotas
        this.express.use(express.json());
        this.express.use((req, res, next) => {
            req.startTime = Date.now();
            next();
        });
    }

    router() {
        this.express.use('/api', require('./appModule'));
        this.express.get("/health/", (req, res) => {
            // Calcula o tempo decorrido
            const duration = Date.now() - req.startTime;

            res.send({
                status: "Application Up",
                message: `HTTP request received. Response successfully rendered in ${duration}ms`
            });
        });
    }
}

function createApiController() {
    return new AppController();
}

const app = createApiController().express;

module.exports = app;
