import React, { useState } from 'react';

export default function EnviarDatos() {
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviarDatosAlBackend(datos: any) {
    setEnviando(true);
    setMensaje('');
    try {
      const response = await fetch('https://biblioteca-63yyy.vercel.app/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }
      setMensaje('Respuesta del backend: ' + JSON.stringify(result));
    } catch (error: any) {
      setMensaje('Error al enviar datos: ' + error.message + '. Guardando localmente.');
      // Guardar localmente si falla
      const pendientes = JSON.parse(localStorage.getItem('pendientes') || '[]');
      pendientes.push(datos);
      localStorage.setItem('pendientes', JSON.stringify(pendientes));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="my-8 text-center">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
        onClick={() => enviarDatosAlBackend({ libro: 'Ejemplo', usuario: 'admin' })}
        disabled={enviando}
      >
        {enviando ? 'Enviando...' : 'Enviar datos de ejemplo al backend'}
      </button>
      {mensaje && <div className="mt-4 text-gray-700">{mensaje}</div>}
    </div>
  );
}
