import json
import sqlite3
import bcrypt
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        username = data.get('username')
        password = data.get('password')

        conn = sqlite3.connect('api/users.db')
        c = conn.cursor()
        c.execute('SELECT password FROM users WHERE username = ?', (username,))
        row = c.fetchone()
        conn.close()

        if row and bcrypt.checkpw(password.encode(), row[0].encode()):
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
