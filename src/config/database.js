require('dotenv').config();

module.exports = {
    development: {
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        define: {
            timestamps: false,
            underscored: true,
            underscoredAll: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        dialectOptions: {
            timezone: 'local',
        },
        timezone: 'America/Sao_Paulo'
    }   
};
