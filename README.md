# 🍽️ Reservations System - Backend

Sistema de gestión de reservas para restaurantes desarrollado con Spring Boot. Este backend proporciona una API REST completa para gestionar clientes, reservas, platos y administradores, con autenticación JWT y seguridad integrada.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Base de Datos](#base-de-datos)
- [Variables de Entorno](#variables-de-entorno)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Sistema de Seguridad](#sistema-de-seguridad)
- [Migraciones de Base de Datos](#migraciones-de-base-de-datos)

## ✨ Características

- **API RESTful**: Endpoints REST completos para todas las operaciones
- **Autenticación JWT**: Sistema seguro de autenticación con tokens JWT
- **Gestión de Clientes**: CRUD completo para clientes
- **Sistema de Reservas**: Crear, buscar, cancelar y consultar reservas
- **Gestión de Platos**: Catálogo de platos con categorías y disponibilidad
- **Panel de Administración**: Endpoints protegidos para administradores
- **Validación de Datos**: Validación automática con Bean Validation
- **Migraciones con Flyway**: Control de versiones de base de datos
- **CORS Configurado**: Soporte para integración con frontend

## 🛠️ Tecnologías

- **Spring Boot 3.5.5**: Framework principal
- **Java 17**: Lenguaje de programación
- **Spring Data JPA**: Persistencia de datos
- **PostgreSQL**: Base de datos relacional
- **Spring Security**: Seguridad y autenticación
- **JWT (jjwt 0.12.3)**: Tokens JSON Web Token
- **Flyway**: Migraciones de base de datos
- **Lombok**: Reducción de código boilerplate
- **Maven**: Gestor de dependencias

## 📦 Requisitos Previos

- **Java 17** o superior
- **Maven 3.6+**
- **PostgreSQL 12+** (o Docker para ejecutar PostgreSQL)
- **Variables de entorno** configuradas (ver sección de configuración)

## 🚀 Instalación

1. **Clonar o navegar al directorio del proyecto**:
   ```bash
   cd Project_final_BootCamp_Java_web
   ```

2. **Compilar el proyecto**:
   ```bash
   mvn clean install
   ```

3. **Configurar la base de datos** (ver sección de Base de Datos)

4. **Configurar variables de entorno** (ver sección de Variables de Entorno)

## ⚙️ Configuración

### Base de Datos

El proyecto utiliza PostgreSQL. Tienes dos opciones:

#### Opción 1: PostgreSQL Local

1. Crear una base de datos PostgreSQL:
   ```sql
   CREATE DATABASE reservations_db;
   ```

2. Configurar las credenciales en `application.properties` o variables de entorno

#### Opción 2: Docker (Recomendado)

El proyecto incluye un `docker-compose.yml` para facilitar el despliegue:

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL automáticamente.

### Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

```bash
# Base de Datos
DB_URL=jdbc:postgresql://localhost:5432/reservations_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

# Administrador por defecto
ADMIN_PASSWORD_ENV=contraseña_del_admin

# JWT Security
JWT_SECRET_KEY=tu_clave_secreta_muy_larga_y_segura_minimo_256_bits
JWT_EXPIRATION=86400000  # Tiempo de expiración en milisegundos (24 horas)
```

### Configuración en application.properties

El archivo `src/main/resources/application.properties` contiene:

```properties
spring.application.name=reservations-system
server.port=8087

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Flyway
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
```

**Nota**: Las credenciales de base de datos deben configurarse mediante variables de entorno por seguridad.

## 💻 Uso

### Ejecutar en Desarrollo

```bash
mvn spring-boot:run
```

O ejecutar el JAR compilado:

```bash
java -jar target/reservations-system-0.0.1-SNAPSHOT.jar
```

La aplicación estará disponible en `http://localhost:8087`

### Ejecutar con Docker

```bash
docker-compose up
```

Esto iniciará tanto PostgreSQL como la aplicación Spring Boot.

## 📁 Estructura del Proyecto

```
src/main/java/com/example/demo/
├── ReservationsApplication.java    # Clase principal de Spring Boot
│
├── admin/                          # Módulo de administración
│   ├── controller/
│   │   └── AuthController.java     # Endpoints de autenticación
│   ├── dto/
│   │   ├── AuthResponse.java
│   │   └── LoginRequest.java
│   ├── entity/
│   │   └── AdminEntity.java
│   ├── jwt/
│   │   ├── JwtAuthenticationFilter.java
│   │   └── JwtTokenProvider.java
│   ├── repository/
│   │   └── AdminRepository.java
│   └── service/
│       ├── AdminUserDetailsService.java
│       └── AuthService.java
│
├── customer/                       # Módulo de clientes
│   ├── controller/
│   │   └── CustomerController.java
│   ├── dto/
│   ├── entity/
│   ├── mapper/
│   ├── repository/
│   └── service/
│
├── plate/                          # Módulo de platos
│   ├── controller/
│   │   └── PlateController.java
│   ├── dto/
│   ├── entity/
│   ├── mapper/
│   ├── repository/
│   └── service/
│
├── reservation/                    # Módulo de reservas
│   ├── controller/
│   │   └── ReservationController.java
│   ├── dto/
│   ├── entity/
│   ├── enums/
│   │   └── ReservationStatus.java
│   ├── mapper/
│   ├── repository/
│   └── service/
│
├── config/                         # Configuraciones
│   ├── DataInitializer.java       # Inicialización de datos
│   ├── SecurityConfig.java         # Configuración de seguridad
│   └── WebConfigGlobal.java       # Configuración CORS
│
└── shared/                         # Componentes compartidos
    └── exception/                  # Manejo de excepciones
```

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Iniciar sesión como administrador | No |

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Clientes

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/customers` | Crear nuevo cliente | No |
| GET | `/api/customers/dni/{dni}` | Buscar cliente por DNI | No |
| PUT | `/api/customers/dni/{dni}/email` | Actualizar email del cliente | No |

### Platos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/plates` | Obtener todos los platos disponibles | No |
| GET | `/api/plates/categories` | Obtener todas las categorías | No |
| GET | `/api/plates/categories/{categoryId}` | Obtener platos por categoría | No |
| GET | `/api/plates/admin/all` | Obtener todos los platos (admin) | Sí (JWT) |
| PUT | `/api/plates/{plateId}/availability` | Actualizar disponibilidad | Sí (JWT) |

### Reservas

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/reservations` | Crear nueva reserva | No |
| GET | `/api/reservations/search/{dni}/pending` | Buscar reservas pendientes por DNI | No |
| PUT | `/api/reservations/cancel/{reservationId}` | Cancelar reserva | No |
| GET | `/api/reservations/by-date/{date}` | Obtener reservas por fecha | Sí (JWT) |

## 🔐 Sistema de Seguridad

### Autenticación JWT

El sistema utiliza JSON Web Tokens (JWT) para la autenticación:

1. **Login**: El cliente envía credenciales a `/api/auth/login`
2. **Validación**: El servidor valida las credenciales contra la base de datos
3. **Token**: Si son válidas, se genera un JWT firmado con una clave secreta
4. **Respuesta**: El token se envía al cliente
5. **Uso**: El cliente incluye el token en el header `Authorization: Bearer <token>` para requests protegidos

### Configuración de Seguridad

- **`SecurityConfig.java`**: Configura las reglas de seguridad, rutas públicas y protegidas
- **`JwtAuthenticationFilter.java`**: Filtro que intercepta requests y valida tokens JWT
- **`JwtTokenProvider.java`**: Utilidad para generar y validar tokens JWT

### Rutas Protegidas

Las siguientes rutas requieren autenticación JWT:
- `/api/plates/admin/all` - Obtener todos los platos
- `/api/plates/{id}/availability` - Actualizar disponibilidad
- `/api/reservations/by-date/{date}` - Consultar reservas por fecha

### Rutas Públicas

- `/api/auth/login` - Login
- `/api/customers/*` - Gestión de clientes
- `/api/plates` (GET) - Obtener platos disponibles
- `/api/reservations` (POST, GET, PUT) - Gestión de reservas (excepto consulta por fecha)

## 🗄️ Migraciones de Base de Datos

El proyecto utiliza **Flyway** para gestionar las migraciones de base de datos.

### Ubicación de Migraciones

Las migraciones se encuentran en: `src/main/resources/db/migration/`

### Formato de Nombres

Las migraciones deben seguir el formato: `V{version}__{descripción}.sql`

Ejemplo: `V1__create_tables.sql`

### Ejecución Automática

Flyway ejecuta automáticamente las migraciones al iniciar la aplicación si:
- `spring.flyway.enabled=true`
- `spring.flyway.baseline-on-migrate=true`

### Ejecutar Migraciones Manualmente

```bash
mvn flyway:migrate
```

## 🧪 Testing

Ejecutar los tests:

```bash
mvn test
```

## 📦 Construcción

### Generar JAR

```bash
mvn clean package
```

El JAR se generará en: `target/reservations-system-0.0.1-SNAPSHOT.jar`

### Ejecutar JAR

```bash
java -jar target/reservations-system-0.0.1-SNAPSHOT.jar
```

## 🐳 Docker

El proyecto incluye configuración Docker:

- **`Dockerfile`**: Para construir la imagen de la aplicación
- **`docker-compose.yml`**: Para orquestar PostgreSQL y la aplicación

### Construir y Ejecutar con Docker

```bash
docker-compose up --build
```

## 🔧 Configuración Adicional

### Logging

El proyecto muestra SQL en consola cuando `spring.jpa.show-sql=true` está activado.

### CORS

La configuración CORS está en `WebConfigGlobal.java` para permitir requests desde el frontend.

### Inicialización de Datos

`DataInitializer.java` se encarga de crear el usuario administrador por defecto si no existe.

## 📄 Licencia

Este proyecto es parte de un sistema de gestión de reservas para restaurantes.

## 👥 Contribuidores

Desarrollado como proyecto final del BootCamp Java Web.

## 🆘 Solución de Problemas

### Error de Conexión a Base de Datos

- Verificar que PostgreSQL esté corriendo
- Verificar las credenciales en las variables de entorno
- Verificar que la base de datos exista

### Error de Migraciones Flyway

- Verificar que las migraciones estén en el formato correcto
- Limpiar la base de datos si es necesario: `mvn flyway:clean`

### Error de Autenticación JWT

- Verificar que `JWT_SECRET_KEY` esté configurada
- Verificar que el token se esté enviando correctamente en el header
