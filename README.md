# Challenge Academia ForIT 2025 - Aplicación de Tareas

Una aplicación de lista de tareas desarrollada con **NextJs** (frontend) y **ExpressJs** (backend) para el challenge de ingreso a Academia ForIT 2025.

## Características

- Crear, leer, actualizar y eliminar tareas
- Búsqueda de tareas
- Interfaz moderna con Tailwind CSS
- Filtros por estado (todas, completadas, pendientes)
- API REST con Express y TypeScript

## Estructura del Proyecto

```
forit-challenge/
├── backend/          # API con Express + TypeScript
├── frontend/         # Aplicación Next.js
└── README.md
```

## Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/gianlucafarias/forit-challenge
cd forit-challenge
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en la carpeta `backend`:

```env
PORT=3008
```

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
```

### 4. Ejecutar la aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Acceder a la aplicación

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3008

## Endpoints de la API

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea
- `DELETE /api/tasks/:id` - Eliminar una tarea

## Funcionalidades Implementadas

### Backend
- ✅ Servidor Express con TypeScript
- ✅ Endpoints CRUD completos
- ✅ Almacenamiento en memoria
- ✅ Manejo de errores
- ✅ CORS configurado
- ✅ Variables de entorno

### Frontend
- ✅ Next.js 15 con App Router
- ✅ TypeScript
- ✅ Tailwind CSS para estilos
- ✅ Componentes con Shadcn
- ✅ Formularios con React Hook Form
- ✅ Validación con Zod
- ✅ Filtros y búsqueda
- ✅ Notificaciones con Sonner

## Tecnologías Utilizadas

**Backend:**
- Express js
- TypeScript
- CORS
- dotenv

**Frontend:**
- NextJs 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod
- Sonner

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar linting
npm run lint
```

## Notas

- El backend usa almacenamiento en memoria, por lo que los datos se pierden al reiniciar el servidor
- La aplicación está configurada para desarrollo local
- Todos los endpoints incluyen manejo básico de errores

---
