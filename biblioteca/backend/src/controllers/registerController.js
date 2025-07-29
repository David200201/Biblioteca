// Controlador para registrar un nuevo usuario
const { sql, config } = require('../database/sqlserver');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Validar campos requeridos
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }
        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);
        // Insertar usuario en la base de datos
        await sql.connect(config);
        const result = await sql.query`
            INSERT INTO Users (FirstName, LastName, Email, PasswordHash)
            VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash});
            SELECT SCOPE_IDENTITY() AS UserID;
        `;
        const userId = result.recordset[0].UserID;
        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            user: { userId, firstName, lastName, email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
    }
};
