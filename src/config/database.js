require('dotenv').config();

module.exports = {
    development: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        define: {
            timestamps: false,
            underscored: true,
            underscoredAll: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(__dirname + '/path/to/DigiCertGlobalRootCA.crt.pem') // Certifique-se de fornecer o caminho correto
            },
            timezone: 'local',
        },
        timezone: 'America/Sao_Paulo'
    }   
};
