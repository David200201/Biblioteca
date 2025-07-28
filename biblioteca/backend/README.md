# Backend - Biblioteca Online

## Descripción

API REST para el sistema de biblioteca online construida con Node.js, Express y SQL Server.

## Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQL Server** - Base de datos relacional
- **Azure SQL Database** - Base de datos en la nube
- **JWT** - Autenticación
- **bcryptjs** - Cifrado de contraseñas
- **express-validator** - Validación de datos

## Funcionalidades Implementadas

### ✅ Completadas

- **Autenticación** - Registro y login de usuarios
- **Gestión de libros** - CRUD de libros con búsqueda y filtros
- **Gestión de préstamos** - Crear, renovar y devolver libros
- **Gestión de usuarios** - Perfiles y historial de préstamos
- **Validación de datos** - Middleware de validación
- **Manejo de errores** - Middleware de errores centralizado

### 🔄 En Desarrollo

- Integración con base de datos real
- Sistema de notificaciones
- Panel de administración
- Subida de archivos
- Reportes y estadísticas

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env
# Editar .env con tus credenciales

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── index.js              # Servidor principal
│   ├── routes/               # Rutas de la API
│   │   ├── auth.js           # Autenticación
│   │   ├── books.js          # Gestión de libros
│   │   ├── loans.js          # Gestión de préstamos
│   │   └── users.js          # Gestión de usuarios
│   ├── controllers/          # Controladores (futuro)
│   ├── models/               # Modelos de datos (futuro)
│   └── middleware/           # Middleware personalizado (futuro)
├── package.json              # Dependencias
├── env.example               # Variables de entorno de ejemplo
└── README.md                 # Este archivo
```

## Variables de Entorno

Crear archivo `.env` basado en `env.example`:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Base de Datos
DB_SERVER=your-server.database.windows.net
DB_NAME=BibliotecaOnline
DB_USER=your-username
DB_PASSWORD=your-password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Endpoints de la API

### Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario

### Libros

- `GET /api/books` - Obtener todos los libros
- `GET /api/books/:id` - Obtener libro por ID
- `GET /api/books/categories/list` - Obtener categorías

### Préstamos

- `GET /api/loans/user/:userId` - Préstamos del usuario
- `POST /api/loans` - Crear préstamo
- `PUT /api/loans/:loanId/renew` - Renovar préstamo
- `PUT /api/loans/:loanId/return` - Devolver libro
- `GET /api/loans/stats/:userId` - Estadísticas de préstamos

### Usuarios

- `GET /api/users/profile/:userId` - Perfil del usuario
- `PUT /api/users/profile/:userId` - Actualizar perfil
- `GET /api/users/:userId/loan-history` - Historial de préstamos
- `GET /api/users/:userId/recommendations` - Recomendaciones

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con nodemon
- `npm start` - Servidor de producción
- `npm test` - Ejecutar tests (futuro)

## Base de Datos

### Configuración Local

1. Instalar SQL Server
2. Crear base de datos `BibliotecaOnline`
3. Ejecutar `database/schema.sql`
4. Configurar variables de entorno

### Configuración Azure SQL

1. Crear Azure SQL Database
2. Configurar firewall y reglas de red
3. Ejecutar `database/schema.sql`
4. Configurar variables de entorno

## Despliegue

### Azure App Service

1. Crear App Service en Azure
2. Configurar variables de entorno
3. Conectar con Azure SQL Database
4. Desplegar código

### Docker (futuro)

```bash
# Construir imagen
docker build -t biblioteca-backend .

# Ejecutar contenedor
docker run -p 3001:3001 biblioteca-backend
```

## Próximos Pasos

1. Integrar con base de datos real
2. Implementar middleware de autenticación
3. Agregar validación de datos más robusta
4. Implementar logging y monitoreo
5. Agregar tests unitarios e integración
6. Configurar CI/CD
