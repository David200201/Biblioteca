// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Aquí deberías agregar la lógica para guardar el usuario en la base de datos
    // Por ahora solo respondemos con los datos recibidos
    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      user: { firstName, lastName, email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
  }
};
