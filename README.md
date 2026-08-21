# FixNow - Sistema de Tickets de Soporte Técnico

Una aplicación web moderna y funcional para gestionar tickets de soporte técnico, construida con React y Express.

## Características

✅ Crear tickets de soporte con título, descripción y prioridad
✅ Listar todos los tickets con filtrado por estado
✅ Ver detalles completos de un ticket
✅ Cambiar el estado de un ticket (Abierto → En proceso → Cerrado)
✅ Interfaz moderna y responsiva
✅ API REST simulada con Express
✅ Diseño limpio con colores suaves y botones redondeados

## Estados del Ticket

- **Abierto**: Ticket recién creado, sin atender
- **En proceso**: Ticket siendo trabajado por el equipo
- **Cerrado**: Ticket resuelto o completado

## Prioridades

- **Baja**: Problemas no urgentes
- **Media**: Problemas normales
- **Alta**: Problemas críticos que necesitan atención inmediata

## Estructura del Proyecto

```text
fixnow/
├── public/
│   └── index.html                  # HTML principal
│
├── src/
│   ├── components/
│   │   ├── CreateTicket.js         # Componente para crear tickets
│   │   ├── TicketDetail.js         # Componente de detalle del ticket
│   │   └── TicketList.js           # Componente para listar tickets
│   │
│   ├── models/
│   │   └── Ticket.js               # Modelo de Ticket
│   │
│   ├── services/
│   │   └── ticketService.js        # Servicio API con Axios
│   │
│   ├── styles/
│   │   ├── index.css               # Estilos globales
│   │   ├── App.css                 # Estilos de la app
│   │   ├── TicketList.css          # Estilos de la lista
│   │   ├── TicketDetail.css        # Estilos del detalle
│   │   └── CreateTicket.css         # Estilos de crear ticket
│   │
│   ├── App.js                      # Componente principal
│   └── index.js                    # Punto de entrada
│
├── server.js                       # Servidor Express
└── package.json                    # Dependencias
```
## Instalación

### Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

### Paso 1: Clonar o Descargar el Proyecto

\`\`\`bash
cd fixnow
\`\`\`

### Paso 2: Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

## Ejecución

### Opción 1: Ejecutar Servidor y Cliente Simultáneamente (Recomendado)

\`\`\`bash
npm run dev
\`\`\`

Esto ejecutará:
- Servidor Express en `http://localhost:5000`
- Cliente React en `http://localhost:3000`

### Opción 2: Ejecutar por Separado

**Terminal 1 - Servidor:**

\`\`\`bash
npm run server
\`\`\`

El servidor estará disponible en `http://localhost:5000`

**Terminal 2 - Cliente:**

\`\`\`bash
npm start
\`\`\`

La aplicación se abrirá en `http://localhost:3000`

## API Endpoints

Todos los endpoints disponibles en el servidor Express:

### GET /tickets
Obtiene la lista completa de tickets.

**Respuesta:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Problema con login",
    "description": "No puedo acceder a mi cuenta",
    "priority": "Alta",
    "status": "Abierto",
    "date": "2024-01-15T10:30:00.000Z",
    "userId": "user-1"
  }
]
\`\`\`

### GET /tickets/:id
Obtiene un ticket específico por su ID.

**Respuesta:**
\`\`\`json
{
  "id": "uuid",
  "title": "Problema con login",
  "description": "No puedo acceder a mi cuenta",
  "priority": "Alta",
  "status": "Abierto",
  "date": "2024-01-15T10:30:00.000Z",
  "userId": "user-1"
}
\`\`\`

### POST /tickets
Crea un nuevo ticket.

**Body:**
\`\`\`json
{
  "title": "Error en reportes",
  "description": "Los reportes no se generan",
  "priority": "Media",
  "userId": "user-2"
}
\`\`\`

**Respuesta:**
\`\`\`json
{
  "id": "uuid-generado",
  "title": "Error en reportes",
  "description": "Los reportes no se generan",
  "priority": "Media",
  "status": "Abierto",
  "date": "2024-01-15T10:35:00.000Z",
  "userId": "user-2"
}
\`\`\`

### PUT /tickets/:id
Actualiza el estado de un ticket.

**Body:**
\`\`\`json
{
  "status": "En proceso"
}
\`\`\`

**Respuesta:**
\`\`\`json
{
  "id": "uuid",
  "title": "Error en reportes",
  "description": "Los reportes no se generan",
  "priority": "Media",
  "status": "En proceso",
  "date": "2024-01-15T10:35:00.000Z",
  "userId": "user-2"
}
\`\`\`

## Uso de la Aplicación

### 1. Ver Tickets
- Accede a la página principal (`/`)
- Verás una lista de todos los tickets
- Puedes filtrar por estado usando los botones en la parte superior

### 2. Crear un Nuevo Ticket
- Haz clic en el botón "+ Nuevo Ticket" en la navegación
- Completa el formulario con:
  - **Título**: Descripción breve del problema
  - **Descripción**: Detalles del problema
  - **Prioridad**: Selecciona Baja, Media o Alta
- Haz clic en "Crear Ticket"

### 3. Ver Detalles del Ticket
- Haz clic en cualquier ticket de la lista
- Verás toda la información del ticket:
  - Título
  - Descripción completa
  - Prioridad
  - Estado actual
  - Fecha de creación
  - ID del usuario

### 4. Cambiar Estado del Ticket
- Abre el detalle de un ticket
- En la sección "Cambiar Estado" haz clic en el nuevo estado
- El ticket se actualizará inmediatamente

## Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca para construir interfaces
- **React Router DOM**: Enrutamiento
- **Axios**: Cliente HTTP para peticiones
- **CSS3**: Estilos modernos y responsivos

### Backend
- **Express**: Framework web para Node.js
- **CORS**: Middleware para permitir peticiones cross-origin
- **UUID**: Generación de IDs únicos

## Personalización

### Cambiar Colores
Edita las variables CSS en `src/styles/index.css`:

\`\`\`css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  /* ... más variables ... */
}
\`\`\`

### Agregar más Estados
1. Actualiza el modelo en `server.js`
2. Modifica la validación en `src/models/Ticket.js`
3. Agrega los botones en `src/components/TicketDetail.js`

### Cambiar Puerto del Servidor
En `server.js`:
\`\`\`javascript
const PORT = 5000; // Cambia este número
\`\`\`

En `src/services/ticketService.js`:
\`\`\`javascript
const API_URL = 'http://localhost:5000'; // Actualiza este número
\`\`\`

## Características Futuras (No Implementadas)

- Autenticación de usuarios
- Base de datos permanente
- Sistema de comentarios en tickets
- Asignación de tickets a usuarios
- Notificaciones por email
- Exportación de reportes
- Panel de administración

## Licencia

MIT

## Autor

FixNow - Sistema de Gestión de Tickets

---

¡Gracias por usar FixNow! Si tienes preguntas o sugerencias, siéntete libre de mejorar el proyecto.
