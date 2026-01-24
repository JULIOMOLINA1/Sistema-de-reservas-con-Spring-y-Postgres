# Reservations System - Backend

Sistema de gestión de reservas para restaurantes desarrollado con Spring Boot. Este backend proporciona una API REST completa y segura para gestionar clientes, platos, reservas y administradores.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Sistema de Seguridad](#sistema-de-seguridad)
- [Base de Datos](#base-de-datos)
- [Docker](#docker)

## Características

- **Gestión de Clientes**: CRUD completo para clientes
- **Sistema de Reservas**: Crear, buscar y cancelar reservas con diferentes estados
- **Catálogo de Platos**: Gestión de platos organizados por categorías (Platos, Postres, Bebidas)
- **Panel de Administración**: 
    - Autenticación JWT segura
    - Gestión de disponibilidad de platos
    - Visualización y gestión de reservas
- **Migraciones de Base de Datos**: Flyway para versionado de esquemas
- **Validación de Datos**: Validación automática de requests
- **Manejo de Excepciones**: Manejo global de excepciones con respuestas estructuradas

## Tecnologías

- **Spring Boot 3.5.5**: Framework principal para desarrollo de aplicaciones Java
- **Java 17**: Lenguaje de programación
- **Spring Data JPA**: Abstracción para acceso a datos
- **PostgreSQL**: Base de datos relacional
- **Spring Security**: Framework de seguridad
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens
- **Flyway**: Herramienta de migración de base de datos
- **Lombok**: Reducción de código boilerplate
- **Maven**: Gestor de dependencias y construcción
- **Docker**: Contenedorización de la aplicación

## Requisitos Previos

- **Java 17** o superior
- **Maven 3.6+** o superior
- **PostgreSQL 16** o superior (si no usas Docker)
- **Docker y Docker Compose** (opcional, para ejecutar con contenedores)

## Instalación

### Opción 1: Instalación Local (sin Docker)

1. **Clonar o navegar al directorio del proyecto**:
   ```bash
   cd Project_final_BootCamp_Java_web
   ```

2. **Configurar la base de datos PostgreSQL**:
   - Crear una base de datos PostgreSQL
   - Configurar las variables de entorno (ver sección [Configuración](#configuración))

3. **Compilar el proyecto**:
   ```bash
   mvn clean install
   ```

4. **Ejecutar la aplicación**:
   ```bash
   mvn spring-boot:run
   ```

### Opción 2: Instalación con Docker

1. **Configurar variables de entorno**:
   - Copiar `.env.example` a `.env`
   - Configurar las variables necesarias (ver sección [Configuración](#configuración))

2. **Construir y ejecutar con Docker Compose**:
   ```bash
   docker-compose up --build
   ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `.env.example` con las siguientes variables:

```env
# Configuración de Base de Datos
DB_URL=jdbc:postgresql://localhost:5433/reservations_db
DB_NAME=reservations_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

# Configuración de Seguridad
JWT_SECRET_KEY=tu_clave_secreta_jwt_muy_segura
JWT_EXPIRATION=  # Tiempo de expiración en milisegundos

# Configuración de Administrador
ADMIN_PASSWORD_ENV=contraseña_admin_por_defecto
```

### Configuración de application.properties

El archivo `src/main/resources/application.properties` contiene:

- **Puerto del servidor**: `8087`
- **Configuración JPA**: Validación de esquema, mostrar SQL, dialecto PostgreSQL
- **Flyway**: Habilitado para migraciones automáticas
- **Seguridad**: Configuración de JWT y contraseña de administrador por defecto

### Inicialización de Datos

La aplicación incluye un `DataInitializer` que crea un usuario administrador por defecto al iniciar. Las credenciales se configuran mediante la variable de entorno `ADMIN_PASSWORD_ENV`.

## Uso

### Modo Desarrollo

Ejecuta la aplicación en modo desarrollo:

```bash
mvn spring-boot:run
```

La API estará disponible en `http://localhost:8087`

### Construcción para Producción

Genera el JAR ejecutable:

```bash
mvn clean package
```

El archivo JAR se generará en `target/reservations-system-0.0.1-SNAPSHOT.jar`

Ejecuta el JAR:

```bash
java -jar target/reservations-system-0.0.1-SNAPSHOT.jar
```

## API Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión como administrador

### Clientes

- `GET /api/customers` - Listar todos los clientes
- `GET /api/customers/{id}` - Obtener cliente por ID
- `GET /api/customers/search?email={email}` - Buscar cliente por email
- `POST /api/customers` - Crear nuevo cliente
- `PUT /api/customers/{id}` - Actualizar cliente

### Platos

- `GET /api/plates` - Listar todos los platos
- `GET /api/plates/{id}` - Obtener plato por ID
- `GET /api/plates/category/{category}` - Obtener platos por categoría
- `PUT /api/plates/{id}/availability` - Actualizar disponibilidad de plato (requiere autenticación)

### Reservas

- `GET /api/reservations` - Listar todas las reservas
- `GET /api/reservations/{id}` - Obtener reserva por ID
- `GET /api/reservations/search?email={email}` - Buscar reservas por email de cliente
- `POST /api/reservations` - Crear nueva reserva
- `PUT /api/reservations/{id}/cancel` - Cancelar reserva

## Sistema de Seguridad

### Autenticación JWT

El sistema utiliza JSON Web Tokens (JWT) para autenticación de administradores:

1. **Login**: El administrador envía credenciales a `/api/auth/login`
2. **Validación**: El sistema valida las credenciales contra la base de datos
3. **Token**: Se genera un JWT con información del usuario
4. **Respuesta**: Se retorna el token en el header `Authorization: Bearer {token}`
5. **Protección**: Los endpoints protegidos validan el token en cada request

### Endpoints Protegidos

Los siguientes endpoints requieren autenticación JWT:

- `PUT /api/plates/{id}/availability` - Actualizar disponibilidad de platos
- Cualquier endpoint administrativo futuro

### Configuración de Seguridad

- **Filtro JWT**: `JwtAuthenticationFilter` intercepta requests y valida tokens
- **Proveedor JWT**: `JwtTokenProvider` genera y valida tokens
- **UserDetailsService**: `AdminUserDetailsService` carga detalles del usuario
- **SecurityConfig**: Configuración de Spring Security con filtros personalizados

## Base de Datos

### Migraciones con Flyway

El proyecto utiliza Flyway para gestionar migraciones de base de datos:

- **Ubicación**: `src/main/resources/db/migration/`
- **Formato**: `V{version}__{descripción}.sql`
- **Ejecución**: Automática al iniciar la aplicación

### Esquema de Base de Datos

Las tablas principales incluyen:

- **admins**: Usuarios administradores
- **customers**: Clientes del restaurante
- **plates**: Platos del menú
- **categories**: Categorías de platos
- **reservations**: Reservas realizadas

### Configuración JPA

- **DDL Auto**: `validate` - Valida el esquema sin modificarlo
- **Show SQL**: Habilitado para desarrollo
- **Dialect**: PostgreSQL
- **Open-in-view**: Deshabilitado para mejor rendimiento

## Docker

### Docker Compose

El proyecto incluye `docker-compose.yml` que configura:

- **PostgreSQL**: Base de datos en el puerto `5433`
- **Backend**: Aplicación Spring Boot en el puerto `8087`
- **Frontend**: Aplicación React (opcional)

### Comandos Docker

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f reservations-system

# Reconstruir solo el backend
docker-compose build reservations-system
```

### Dockerfile

El `Dockerfile` construye una imagen multi-stage:
1. Compila la aplicación con Maven
2. Crea una imagen ligera con el JAR ejecutable

## Integración con Frontend

El backend está diseñado para integrarse con el frontend React que se encuentra en la carpeta `frontend/`. 

- **CORS**: Configurado en `WebConfigGlobal` para permitir requests del frontend
- **Puerto**: El backend corre en `http://localhost:8087`
- **API Base**: Todas las rutas API comienzan con `/api/`

## Desarrollo

### Ejecutar Tests

```bash
mvn test
```

### Limpiar y Recompilar

```bash
mvn clean compile
```

### Generar Documentación

```bash
mvn javadoc:javadoc
```

## Notas Adicionales

- El proyecto utiliza **Lombok** para reducir código boilerplate
- Las migraciones de Flyway se ejecutan automáticamente al iniciar
- El usuario administrador se crea automáticamente si no existe
- Los logs SQL están habilitados en desarrollo para debugging
