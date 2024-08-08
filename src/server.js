const minhaApi = require('./index')

minhaApi.listen(5000, () => {
    console.log('Servidor conectado na porta 5000.');
})
