// Comunicación con el backend web para datos personalizados
async function enviarDatosAlBackend(datos) {
    try {
        const response = await fetch('https://biblioteca-63yyy.vercel.app/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
        const result = await response.json();
        mostrarMensaje('Respuesta del backend: ' + JSON.stringify(result));
    } catch (error) {
        mostrarMensaje('Error al enviar datos: ' + error.message);
    }
}

function mostrarMensaje(msg) {
    let mensajeDiv = document.getElementById('mensaje');
    if (!mensajeDiv) {
        mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje';
        mensajeDiv.style.marginTop = '20px';
        document.getElementById('app').appendChild(mensajeDiv);
    }
    mensajeDiv.textContent = msg;
}

document.getElementById('app').innerHTML = `
  <form id="formulario">
    <input type="text" id="libro" placeholder="Nombre del libro" required />
    <input type="text" id="usuario" placeholder="Usuario" required />
    <button type="submit">Enviar datos</button>
  </form>
`;

document.getElementById('formulario').onsubmit = (e) => {
    e.preventDefault();
    const libro = document.getElementById('libro').value;
    const usuario = document.getElementById('usuario').value;
    enviarDatosAlBackend({ libro, usuario });
};