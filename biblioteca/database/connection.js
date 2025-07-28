const sql = require('mssql');

// Configuración para Azure SQL Database
const config = {
    server: process.env.DB_SERVER || 'your-server.database.windows.net',
    database: process.env.DB_NAME || 'BibliotecaOnline',
    user: process.env.DB_USER || 'your-username',
    password: process.env.DB_PASSWORD || 'your-password',
    options: {
        encrypt: true, // Para Azure SQL Database
        enableArithAbort: true,
        trustServerCertificate: false
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Configuración para desarrollo local (SQL Server)
const localConfig = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'BibliotecaOnline',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'your-password',
    options: {
        encrypt: false, // Para desarrollo local
        enableArithAbort: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Seleccionar configuración basada en el entorno
const dbConfig = process.env.NODE_ENV === 'production' ? config : localConfig;

let pool;

// Función para obtener la conexión
async function getConnection() {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig);
            console.log('✅ Conexión a la base de datos establecida');
        }
        return pool;
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        throw error;
    }
}

// Función para ejecutar consultas
async function executeQuery(query, params = []) {
    try {
        const connection = await getConnection();
        const request = connection.request();

        // Agregar parámetros si existen
        params.forEach((param, index) => {
            request.input(`param${index + 1}`, param);
        });

        const result = await request.query(query);
        return result;
    } catch (error) {
        console.error('❌ Error ejecutando consulta:', error);
        throw error;
    }
}

// Función para ejecutar procedimientos almacenados
async function executeStoredProcedure(procedureName, params = {}) {
    try {
        const connection = await getConnection();
        const request = connection.request();

        // Agregar parámetros
        Object.keys(params).forEach(key => {
            request.input(key, params[key]);
        });

        const result = await request.execute(procedureName);
        return result;
    } catch (error) {
        console.error('❌ Error ejecutando procedimiento almacenado:', error);
        throw error;
    }
}

// Función para cerrar la conexión
async function closeConnection() {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            console.log('🔌 Conexión a la base de datos cerrada');
        }
    } catch (error) {
        console.error('❌ Error cerrando conexión:', error);
        throw error;
    }
}

// Función para verificar la conexión
async function testConnection() {
    try {
        const result = await executeQuery('SELECT 1 as test');
        console.log('✅ Conexión a la base de datos verificada');
        return true;
    } catch (error) {
        console.error('❌ Error verificando conexión:', error);
        return false;
    }
}

// Middleware para manejar errores de base de datos
function handleDatabaseError(error, req, res, next) {
    console.error('Database Error:', error);

    if (error.code === 'ELOGIN') {
        return res.status(500).json({
            error: 'Error de autenticación con la base de datos',
            message: 'Verificar credenciales de conexión'
        });
    }

    if (error.code === 'ETIMEOUT') {
        return res.status(500).json({
            error: 'Timeout de conexión a la base de datos',
            message: 'La operación tardó demasiado en completarse'
        });
    }

    if (error.code === 'ECONNREFUSED') {
        return res.status(500).json({
            error: 'No se puede conectar a la base de datos',
            message: 'Verificar que el servidor esté disponible'
        });
    }

    return res.status(500).json({
        error: 'Error interno de la base de datos',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
}

module.exports = {
    getConnection,
    executeQuery,
    executeStoredProcedure,
    closeConnection,
    testConnection,
    handleDatabaseError,
    sql // Exportar sql para tipos de datos
}; 