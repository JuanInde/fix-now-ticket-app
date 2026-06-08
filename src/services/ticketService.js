import axios from "axios"

const API_URL = "http://localhost:5000"

// Refactorización: extracción de rutas a constantes para facilitar futuras modificaciones
const ENDPOINTS = {
  TICKETS: "/tickets"
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

export const getTickets = async () => {
  const response = await axiosInstance.get(ENDPOINTS.TICKETS)
  return response.data
}

export const getTicketById = async (id) => {
  const response = await axiosInstance.get(`${ENDPOINTS.TICKETS}/${id}`)
  return response.data
}

export const createTicket = async (ticketData) => {
  const response = await axiosInstance.post(ENDPOINTS.TICKETS, ticketData)
  return response.data
}

export const updateTicketStatus = async (id, status) => {
  const response = await axiosInstance.put(`${ENDPOINTS.TICKETS}/${id}`, { status })
  return response.data
}