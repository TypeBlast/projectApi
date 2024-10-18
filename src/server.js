require('dotenv').config();
const cors = require('cors');
const app = require('./index');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor conectado e rodando na porta ${PORT} 💾`);
});
