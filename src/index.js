const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const configDatabase = require('./database/index');

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.router();
        this.corsOptions = {
            origin: [
                'https://petexpress.vercel.app',
                'https://petexpress-typeblast.vercel.app'
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        };
    }

    middlewares() {
        this.express.use(cors(this.corsOptions)); 
        this.express.use(express.json());
        this.express.use((req, res, next) => {
            req.startTime = Date.now();
            next();
        });

        this.express.use((req, res, next) => {
            res.on('finish', () => {
                console.log('Response Headers:', res.getHeaders());
            });
            next();
        });
    }

    router() {
        this.express.options('*', cors(this.corsOptions));
        this.express.use('/api', require('./appModule'));
        this.express.get("/health/", (req, res) => {

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
