# Base de Datos - Biblioteca Online

## Descripción

Esquema de base de datos SQL Server para el sistema de biblioteca online, compatible con Azure SQL Database.

## Tecnologías

- **SQL Server** - Sistema de gestión de base de datos
- **Azure SQL Database** - Base de datos en la nube
- **T-SQL** - Lenguaje de consulta

## Estructura de la Base de Datos

### Tablas Principales

#### Users

- Gestión de usuarios del sistema
- Información personal y credenciales
- Tipos de membresía

#### Books

- Catálogo completo de libros
- Información bibliográfica
- Control de inventario

#### Categories

- Categorización de libros
- Organización del catálogo

#### Loans

- Gestión de préstamos
- Control de fechas y estados
- Historial de préstamos

#### Reviews

- Valoraciones y reseñas de usuarios
- Sistema de calificación

#### DigitalBooks

- Libros en formato digital
- Control de acceso a archivos

### Tablas de Soporte

#### Reservations

- Sistema de reservas
- Control de disponibilidad

#### Notifications

- Sistema de notificaciones
- Alertas automáticas

#### SystemConfig

- Configuración del sistema
- Parámetros ajustables

## Instalación

### 1. Crear Base de Datos

```sql
-- En Azure SQL Database
CREATE DATABASE BibliotecaOnline;
GO
```

### 2. Ejecutar Esquema

```bash
# Conectar a la base de datos
sqlcmd -S your-server.database.windows.net -U your-username -P your-password -d BibliotecaOnline

# Ejecutar script
sqlcmd -i schema.sql
```

### 3. Verificar Instalación

```sql
-- Verificar tablas creadas
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';

-- Verificar datos de ejemplo
SELECT * FROM Categories;
SELECT * FROM SystemConfig;
```

## Configuración

### Variables de Entorno

```env
# Azure SQL Database
DB_SERVER=your-server.database.windows.net
DB_NAME=BibliotecaOnline
DB_USER=your-username
DB_PASSWORD=your-password

# Desarrollo Local
DB_SERVER=localhost
DB_NAME=BibliotecaOnline
DB_USER=sa
DB_PASSWORD=your-password
```

### Configuración de Azure SQL

1. **Crear Azure SQL Database**

   - Ir a Azure Portal
   - Crear nuevo recurso SQL Database
   - Configurar servidor y base de datos

2. **Configurar Firewall**

   - Agregar IP del cliente
   - Habilitar acceso desde Azure services

3. **Configurar Autenticación**
   - Usar autenticación SQL
   - Crear usuario y contraseña

## Características

### ✅ Implementadas

- **Esquema completo** con todas las tablas necesarias
- **Relaciones** entre tablas con claves foráneas
- **Índices** para optimizar consultas
- **Triggers** para actualización automática
- **Procedimientos almacenados** para operaciones complejas
- **Datos de ejemplo** para pruebas

### 🔄 En Desarrollo

- **Backup automático** y estrategias de recuperación
- **Particionamiento** para grandes volúmenes de datos
- **Optimización** de consultas complejas
- **Monitoreo** y métricas de rendimiento

## Mantenimiento

### Backup

```sql
-- Backup completo
BACKUP DATABASE BibliotecaOnline
TO DISK = 'C:\Backups\BibliotecaOnline.bak'
WITH FORMAT, INIT, COMPRESSION;
```

### Restore

```sql
-- Restaurar desde backup
RESTORE DATABASE BibliotecaOnline
FROM DISK = 'C:\Backups\BibliotecaOnline.bak'
WITH REPLACE;
```

### Mantenimiento de Índices

```sql
-- Reorganizar índices
ALTER INDEX ALL ON Books REORGANIZE;

-- Reconstruir índices
ALTER INDEX ALL ON Books REBUILD;
```

## Monitoreo

### Consultas Útiles

```sql
-- Verificar conexiones activas
SELECT * FROM sys.dm_exec_connections;

-- Verificar consultas lentas
SELECT * FROM sys.dm_exec_query_stats;

-- Verificar uso de espacio
SELECT
    name,
    size * 8 / 1024 AS SizeMB
FROM sys.database_files;
```

## Seguridad

### Usuarios y Permisos

```sql
-- Crear usuario de aplicación
CREATE USER [biblioteca_app] FOR LOGIN [biblioteca_app];

-- Asignar permisos
GRANT SELECT, INSERT, UPDATE, DELETE ON Books TO [biblioteca_app];
GRANT EXECUTE ON SCHEMA::dbo TO [biblioteca_app];
```

### Encriptación

```sql
-- Habilitar encriptación transparente
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE MyServerCert;

ALTER DATABASE BibliotecaOnline
SET ENCRYPTION ON;
```

## Próximos Pasos

1. **Implementar backup automático**
2. **Configurar monitoreo de rendimiento**
3. **Optimizar consultas frecuentes**
4. **Implementar particionamiento**
5. **Configurar alta disponibilidad**
6. **Implementar auditoría de cambios**
