// Controlador de ejemplo para manejar datos enviados desde el frontend

exports.recibirDatos = (req, res) => {
  const datos = req.body;
  // Aquí puedes agregar la lógica para guardar los datos en la base de datos
  // o procesarlos como necesites
  console.log('Datos recibidos desde el frontend:', datos);
  res.json({ success: true, mensaje: 'Datos recibidos correctamente', datos });
};
