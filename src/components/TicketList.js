"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getTickets } from "../services/ticketService"
import "../styles/TicketList.css"

const TicketList = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("Todos")

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const data = await getTickets()
      setTickets(data)
      setError(null)
    } catch (err) {
      setError("Error al cargar los tickets")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Alta":
        return "priority-alta"
      case "Media":
        return "priority-media"
      case "Baja":
        return "priority-baja"
      default:
        return ""
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Abierto":
        return "status-abierto"
      case "En proceso":
        return "status-proceso"
      case "Cerrado":
        return "status-cerrado"
      default:
        return ""
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "Todos") return true
    return ticket.status === filter
  })

  if (loading) {
    return (
      <div className="ticket-list-container">
        <h1>Mis Tickets</h1>
        <p className="loading">Cargando tickets...</p>
      </div>
    )
  }

  return (
    <div className="ticket-list-container">
      <div className="list-header">
        <h1>Mis Tickets</h1>
        <button onClick={fetchTickets} className="btn-refresh">
          🔄 Actualizar
        </button>
      </div>

      <div className="filter-buttons">
        {["Todos", "Abierto", "En proceso", "Cerrado"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      {filteredTickets.length === 0 ? (
        <div className="empty-state">
          <p>No hay tickets en este estado</p>
        </div>
      ) : (
        <div className="tickets-grid">
          {filteredTickets.map((ticket) => (
            <Link to={`/tickets/${ticket.id}`} key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <h3>{ticket.title}</h3>
                <span className={`priority-badge ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-footer">
                <span className={`status-badge ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                <span className="ticket-date">{new Date(ticket.date).toLocaleDateString("es-ES")}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default TicketList
