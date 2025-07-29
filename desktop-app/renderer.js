// Ejemplo de comunicación con el backend web
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
        alert('Respuesta del backend: ' + JSON.stringify(result));
    } catch (error) {
        alert('Error al enviar datos: ' + error.message);
    }
}

document.getElementById('app').innerHTML = `
  <button id="enviar">Enviar datos de ejemplo al backend</button>
`;
document.getElementById('enviar').onclick = () => {
    enviarDatosAlBackend({ libro: 'Ejemplo', usuario: 'admin' });
};
