require('dotenv').config();
const app = require('./index');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor conectado e rodando na porta ${PORT} 💾`);
});
