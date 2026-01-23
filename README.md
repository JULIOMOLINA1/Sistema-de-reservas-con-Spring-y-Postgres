# Reservations System - Frontend

Sistema de gestión de reservas para restaurantes desarrollado con React, TypeScript y Vite. Este frontend proporciona una interfaz moderna y responsiva para que los clientes realicen reservas y los administradores gestionen el sistema.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Seguridad](#sistema-de-seguridad)
- [Scripts Disponibles](#scripts-disponibles)

## Características

- **Gestión de Clientes**: Crear, buscar y actualizar información de clientes
- **Sistema de Reservas**: Crear, buscar y cancelar reservas
- **Catálogo de Platos**: Visualizar platos por categorías (Platos, Postres, Bebidas)
- **Panel de Administración**:
    - Gestión de disponibilidad de platos
    - Visualización y gestión de reservas
    - Cancelación de reservas
- **Autenticación JWT**: Sistema seguro de login para administradores
- **Rutas Protegidas**: Protección de rutas administrativas
- **Diseño Responsivo**: Interfaz adaptada para diferentes dispositivos

## Tecnologías

- **React 19.2.0**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript 5.9.3**: Superset de JavaScript con tipado estático
- **Vite 7.2.4**: Herramienta de construcción rápida para desarrollo frontend
- **React Router 7.12.0**: Enrutamiento del lado del cliente
- **Tailwind CSS 4.1.18**: Framework de CSS utility-first
- **Lucide React**: Biblioteca de iconos moderna

## Requisitos Previos

- **Node.js**: Versión 18 o superior
- **npm**: Gestor de paquetes
- **Backend en ejecución**: El backend debe estar corriendo en `http://localhost:8087`

## Instalación

1. **Clonar o navegar al directorio del proyecto**:
   ```bash
   cd reservations-system-frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

## ⚙️ Configuración

### Variables de Entorno

El proyecto está configurado para conectarse al backend en `http://localhost:8087` por defecto. Si necesitas cambiar la URL del backend, modifica los archivos en `src/services/`:

- `src/services/auth/authService.ts` - API de autenticación
- `src/services/customers/customerService.ts` - API de clientes
- `src/services/plates/plateService.ts` - API de platos
- `src/services/reservations/reservationService.ts` - API de reservas

### Configuración de Vite

El archivo `vite.config.ts` incluye:
- Plugin de React
- Plugin de Tailwind CSS
- Alias `@` que apunta a `/src` para imports más limpios

## Uso

### Modo Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Construcción para Producción

Genera los archivos optimizados para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## Estructura del Proyecto:

```
src/
├── app/                    # Pantallas legacy (pueden estar en proceso de migración)
│   ├── customers/
│   ├── dishes/
│   ├── home/
│   ├── login/
│   └── reservations/
│
├── common/                 # Tipos y componentes compartidos
│   ├── auth/
│   │   ├── authTypes.ts          # Tipos de autenticación
│   │   └── ProtectedRoute.tsx    # Componente de protección de rutas
│   ├── customers/
│   ├── plates/
│   └── reservations/
│
├── features/               # Módulos de funcionalidades (arquitectura feature-based)
│   ├── customers/
│   │   ├── components/    # Componentes específicos de clientes
│   │   └── screens/        # Pantallas de clientes
│   ├── dishes/
│   ├── home/
│   ├── login/
│   └── reservations/
│
├── layouts/               # Componentes de layout
│   ├── components/
│   │   ├── FooterOverLay.tsx
│   │   ├── HeaderOverLay.tsx
│   │   ├── MenuOverLay.tsx
│   │   └── SectionGeneralPages.tsx
│   └── pages/
│       └── GeneralPage.tsx
│
├── router/                # Configuración de rutas
│   └── router.tsx
│
├── services/              # Servicios de API
│   ├── auth/
│   │   └── authService.ts
│   ├── customers/
│   ├── plates/
│   └── reservations/
│
├── themes/                # Temas y estilos
├── App.tsx                # Componente raíz
├── main.tsx               # Punto de entrada
└── styles.css             # Estilos globales
```

## Sistema de Seguridad

### Flujo de Autenticación

1. **Login**: El usuario ingresa credenciales en `/admin/login`
2. **Autenticación**: Se envía una petición POST a `/api/auth/login`
3. **Almacenamiento**: El token JWT se guarda en `localStorage` con la clave `admin_token`
4. **Protección de Rutas**: Las rutas administrativas están protegidas por el componente `ProtectedRoute`
5. **Verificación**: Cada acceso a rutas protegidas verifica la existencia del token

### Archivos de Seguridad

- `src/common/auth/authTypes.ts`: Define los tipos `LoginRequest` y `AuthResponse`
- `src/services/auth/authService.ts`:
    - `login()`: Autentica al usuario y guarda el token
    - `logout()`: Elimina el token del almacenamiento
    - `getToken()`: Obtiene el token actual
    - `isAuthenticated()`: Verifica si hay un token válido
      -`src/common/auth/ProtectedRoute.tsx`**: Componente que protege rutas, redirige a login si no hay autenticación

### Rutas Protegidas

Las siguientes rutas requieren autenticación:
- `/admin` - Panel principal de administración
- `/admin/cancel` - Cancelación de reservas
- `/admin/plates` - Gestión de disponibilidad de platos
- `/admin/reservations` - Gestión de reservas

### Rutas Públicas

- `/` - Página de inicio
- `/customers/*` - Gestión de clientes
- `/reservations/*` - Gestión de reservas (excepto admin)
- `/dishes/*` - Visualización de platos
- `/admin/login` - Página de login

## Scripts Disponibles

Script y descripción
- `npm run dev`- Inicia el servidor de desarrollo con hot-reload |
- `npm run build`- Compila el proyecto para producción |
- `npm run preview`- Previsualiza la versión de producción |
- `npm run lint`- Ejecuta el linter para verificar el código |

## Integración con Backend

El frontend se comunica con el backend Spring Boot a través de las siguientes APIs:

- **Autenticación**: `POST /api/auth/login`
- **Clientes**: `/api/customers/*`
- **Platos**: `/api/plates/*`
- **Reservas**: `/api/reservations/*`

Asegúrate de que el backend esté corriendo en `http://localhost:8087` antes de iniciar el frontend.

## Estilos

El proyecto utiliza **Tailwind CSS** para el diseño. Los estilos principales incluyen:
- Colores: Esquema de colores slate y amber
- Diseño: Estilo moderno con bordes gruesos y sombras
- Responsive: Grid adaptativo para diferentes tamaños de pantalla
