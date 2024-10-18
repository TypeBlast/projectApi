require('dotenv').config();
const cors = require('cors');
const app = require('./index');
const PORT = process.env.PORT;

// Configuração do CORS
const corsOptions = {
    origin: [
        'https://petexpress.vercel.app',
        'https://petexpress-typeblast.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log(`Servidor conectado e rodando na porta ${PORT} 💾`);
});
