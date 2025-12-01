import axios from "axios"

const API_URL = "http://localhost:5000"

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// GET - Obtener todos los tickets
export const getTickets = async () => {
  const response = await axiosInstance.get("/tickets")
  return response.data
}

// GET - Obtener un ticket por ID
export const getTicketById = async (id) => {
  const response = await axiosInstance.get(`/tickets/${id}`)
  return response.data
}

// POST - Crear un nuevo ticket
export const createTicket = async (ticketData) => {
  const response = await axiosInstance.post("/tickets", ticketData)
  return response.data
}

// PUT - Actualizar el estado de un ticket
export const updateTicketStatus = async (id, status) => {
  const response = await axiosInstance.put(`/tickets/${id}`, { status })
  return response.data
}
