import json
import sqlite3
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        username = data.get('username')
        password = data.get('password')

        # Para el prototipo, usamos una verificación simple
        if username == 'david' and password == 'admin123':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(
                {'success': True, 'message': 'Login correcto'}).encode())
        else:
            self.send_response(401)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(
                {'success': False, 'error': 'Usuario o contraseña incorrectos'}).encode())
