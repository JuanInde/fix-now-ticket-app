"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getTicketById, updateTicketStatus } from "../services/ticketService"
import "../styles/TicketDetail.css"

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchTicket()
  }, [id])

  const fetchTicket = async () => {
    try {
      setLoading(true)
      const data = await getTicketById(id)
      setTicket(data)
      setError(null)
    } catch (err) {
      setError("Error al cargar el ticket")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true)
      const updated = await updateTicketStatus(id, newStatus)
      setTicket(updated)
      setError(null)
    } catch (err) {
      setError("Error al actualizar el estado")
      console.error(err)
    } finally {
      setUpdating(false)
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

  if (loading) {
    return (
      <div className="ticket-detail-container">
        <p className="loading">Cargando ticket...</p>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="ticket-detail-container">
        <p className="error-message">Ticket no encontrado</p>
        <button onClick={() => navigate("/")} className="btn-primary">
          Volver a Tickets
        </button>
      </div>
    )
  }

  return (
    <div className="ticket-detail-container">
      <button onClick={() => navigate("/")} className="btn-back">
        ← Volver
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <h1>{ticket.title}</h1>
          <div className="badges">
            <span className={`priority-badge ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
            <span className={`status-badge ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="detail-body">
          <div className="detail-section">
            <h2>Descripción</h2>
            <p>{ticket.description}</p>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <label>Fecha de Creación</label>
              <p>{new Date(ticket.date).toLocaleString("es-ES")}</p>
            </div>
            <div className="meta-item">
              <label>Usuario</label>
              <p>{ticket.userId}</p>
            </div>
          </div>

          <div className="detail-section">
            <h2>Cambiar Estado</h2>
            <div className="status-buttons">
              {["Abierto", "En proceso", "Cerrado"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={updating || ticket.status === status}
                  className={`btn-status ${ticket.status === status ? "active" : ""}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
