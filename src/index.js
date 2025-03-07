const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const configDatabase = require('./database/index');

class AppController {
    constructor() {
        this.express = express();
        this.corsOptions = {
            origin: [              
                'https://petexpress-typeblast.vercel.app',     
                'http://localhost:5173'                         
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        };
        this.middlewares();
        this.router();
    }

    middlewares() {
        this.express.use(cors(this.corsOptions)); 
        this.express.use(express.json());
    }

    router() {
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
