# Biblioteca Online - Sistema Completo

## Descripción

Sistema completo de gestión de biblioteca online con interfaz de usuario moderna, API REST y base de datos SQL Server.

## Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT, bcryptjs
- **Base de Datos**: SQL Server, Azure SQL Database
- **Despliegue**: Vercel (Frontend), Azure (Backend y DB)

## Estructura del Proyecto

```
Biblioteca/
├── app/                    # Interfaz de usuario (Next.js)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── Header.tsx         # Header con navegación
│   ├── Hero.tsx           # Sección principal
│   ├── BookCatalog.tsx    # Catálogo de libros
│   ├── LoginModal.tsx     # Modal de login
│   └── RegisterModal.tsx  # Modal de registro
├── biblioteca/            # Backend y base de datos
│   ├── backend/           # API REST (Node.js/Express)
│   └── database/          # Scripts de base de datos
├── package.json           # Dependencias del frontend
├── next.config.js         # Configuración de Next.js
├── tailwind.config.js     # Configuración de Tailwind
├── vercel.json            # Configuración de Vercel
└── README.md              # Este archivo
```

## Funcionalidades Implementadas

### ✅ Frontend

- **Página principal** con hero section y características
- **Header** con navegación y botones de autenticación
- **Catálogo de libros** con búsqueda y filtros
- **Modales de login y registro** con formularios
- **Diseño responsive** para móvil, tablet y desktop

### ✅ Backend

- **API REST completa** con endpoints para autenticación, libros, préstamos y usuarios
- **Validación de datos** con express-validator
- **Autenticación JWT** con bcryptjs
- **Manejo de errores** centralizado

### ✅ Base de Datos

- **Esquema completo** con todas las tablas necesarias
- **Relaciones** entre tablas con claves foráneas
- **Índices** para optimizar consultas
- **Triggers** y procedimientos almacenados
- **Compatibilidad** con Azure SQL Database

## Instalación y Configuración

### Frontend (Desarrollo Local)

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

### Backend (Desarrollo Local)

```bash
# Ir al directorio del backend
cd biblioteca/backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env
# Editar .env con tus credenciales

# Ejecutar en modo desarrollo
npm run dev
```

### Base de Datos

```bash
# Ejecutar esquema en Azure SQL Database
# Ver biblioteca/database/README.md para instrucciones detalladas
```

## Variables de Entorno

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)

```env
PORT=3001
NODE_ENV=development
DB_SERVER=your-server.database.windows.net
DB_NAME=BibliotecaOnline
DB_USER=your-username
DB_PASSWORD=your-password
JWT_SECRET=your-super-secret-jwt-key
```

## Despliegue

### Frontend (Vercel)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Backend (Azure App Service)

1. Crear App Service en Azure
2. Configurar variables de entorno
3. Conectar con Azure SQL Database
4. Desplegar código

### Base de Datos (Azure SQL Database)

1. Crear Azure SQL Database
2. Ejecutar `biblioteca/database/schema.sql`
3. Configurar firewall y reglas de red

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

### Usuarios

- `GET /api/users/profile/:userId` - Perfil del usuario
- `PUT /api/users/profile/:userId` - Actualizar perfil
- `GET /api/users/:userId/loan-history` - Historial de préstamos

## Próximos Pasos

1. **Integrar frontend con backend** para funcionalidad completa
2. **Configurar Azure SQL Database** con el esquema proporcionado
3. **Implementar autenticación real** con JWT
4. **Agregar más funcionalidades** como panel de administración
5. **Optimizar rendimiento** y agregar tests
6. **Configurar CI/CD** para despliegue automático

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
