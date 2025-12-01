const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())

// Base de datos simulada en memoria
const tickets = [
  {
    id: uuidv4(),
    title: "Problema con login",
    description: "No puedo acceder a mi cuenta",
    priority: "Alta",
    status: "Abierto",
    date: new Date().toISOString(),
    userId: "user-1",
  },
  {
    id: uuidv4(),
    title: "Error en reportes",
    description: "Los reportes no se generan correctamente",
    priority: "Media",
    status: "En proceso",
    date: new Date().toISOString(),
    userId: "user-2",
  },
  {
    id: uuidv4(),
    title: "Solicitud de nueva funcionalidad",
    description: "Agregar exportación a PDF",
    priority: "Baja",
    status: "Cerrado",
    date: new Date().toISOString(),
    userId: "user-1",
  },
]

// GET - Obtener todos los tickets
app.get("/tickets", (req, res) => {
  res.json(tickets)
})

// GET - Obtener un ticket por ID
app.get("/tickets/:id", (req, res) => {
  const ticket = tickets.find((t) => t.id === req.params.id)
  if (!ticket) {
    return res.status(404).json({ message: "Ticket no encontrado" })
  }
  res.json(ticket)
})

// POST - Crear un nuevo ticket
app.post("/tickets", (req, res) => {
  const { title, description, priority, userId } = req.body

  if (!title || !description || !priority) {
    return res.status(400).json({ message: "Faltan campos requeridos" })
  }

  const newTicket = {
    id: uuidv4(),
    title,
    description,
    priority,
    status: "Abierto",
    date: new Date().toISOString(),
    userId: userId || "user-default",
  }

  tickets.push(newTicket)
  res.status(201).json(newTicket)
})

// PUT - Actualizar estado de un ticket
app.put("/tickets/:id", (req, res) => {
  const { status } = req.body
  const ticket = tickets.find((t) => t.id === req.params.id)

  if (!ticket) {
    return res.status(404).json({ message: "Ticket no encontrado" })
  }

  if (!["Abierto", "En proceso", "Cerrado"].includes(status)) {
    return res.status(400).json({ message: "Estado inválido" })
  }

  ticket.status = status
  res.json(ticket)
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor FixNow ejecutándose en http://localhost:${PORT}`)
})
