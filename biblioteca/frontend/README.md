# Frontend - Biblioteca Online

## Descripción

Interfaz de usuario moderna para el sistema de biblioteca online construida con Next.js, React y TypeScript.

## Tecnologías

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **React Hook Form** - Manejo de formularios
- **Zustand** - Gestión de estado
- **Axios** - Cliente HTTP

## Funcionalidades Implementadas

### ✅ Completadas

- **Página principal** con hero section y características
- **Header** con navegación y botones de autenticación
- **Catálogo de libros** con búsqueda y filtros
- **Modales de login y registro** con formularios
- **Diseño responsive** para móvil, tablet y desktop
- **Componentes reutilizables** con TypeScript

### 🔄 En Desarrollo

- Panel de usuario con préstamos activos
- Detalle de libro con reseñas
- Sistema de valoraciones
- Panel de administración
- Lectura online de libros digitales

## Instalación

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

## Estructura del Proyecto

```
frontend/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Header con navegación
│   ├── Hero.tsx           # Sección principal
│   ├── BookCatalog.tsx    # Catálogo de libros
│   ├── LoginModal.tsx     # Modal de login
│   └── RegisterModal.tsx  # Modal de registro
├── package.json           # Dependencias
├── tailwind.config.js     # Configuración de Tailwind
└── README.md              # Este archivo
```

## Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter de código

## Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

## Próximos Pasos

1. Integrar con API del backend
2. Implementar autenticación real
3. Agregar más páginas y funcionalidades
4. Optimizar rendimiento
5. Agregar tests
