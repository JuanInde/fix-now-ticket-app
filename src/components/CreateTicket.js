"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTicket } from "../services/ticketService"
import "../styles/CreateTicket.css"

const CreateTicket = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Media",
    userId: "user-" + Math.floor(Math.random() * 100),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Por favor completa todos los campos")
      return
    }

    try {
      setLoading(true)
      await createTicket(formData)
      navigate("/")
    } catch (err) {
      setError("Error al crear el ticket")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-ticket-container">
      <div className="create-card">
        <h1>Crear Nuevo Ticket</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label htmlFor="title">Título del Ticket *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Describe el problema brevemente"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Proporciona detalles del problema"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? "Creando..." : "Crear Ticket"}
            </button>
            <button type="button" onClick={() => navigate("/")} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket
