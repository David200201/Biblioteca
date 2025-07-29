// Conexión a Azure SQL Server usando mssql
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // Ejemplo: 'mi-servidor.database.windows.net'
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Para Azure
        trustServerCertificate: false,
    },
};

module.exports = {
    sql,
    config,
};
