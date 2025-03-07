require('dotenv').config();

module.exports = {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST || 'mysql.railway.internal', 
    port: process.env.DATABASE_PORT || 3306,  
    username: process.env.DATABASE_USERNAME || 'root',  
    password: process.env.DATABASE_PASSWORD || 'QNaqOoHytrHiWlkIdNbFBOVsBipJOGrY',  
    database: process.env.DATABASE || 'railway',  
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
};
