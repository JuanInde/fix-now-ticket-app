// Modelo de Ticket
class Ticket {
  constructor(id, title, description, priority, status, date, userId) {
    this.id = id
    this.title = title
    this.description = description
    this.priority = priority // Alta, Media, Baja
    this.status = status // Abierto, En proceso, Cerrado
    this.date = date
    this.userId = userId
  }

  static STATUS_OPTIONS = ["Abierto", "En proceso", "Cerrado"]
  static PRIORITY_OPTIONS = ["Baja", "Media", "Alta"]

  isValid() {
    return this.title && this.description && this.priority && this.status && this.date && this.userId
  }

  updateStatus(newStatus) {
    if (Ticket.STATUS_OPTIONS.includes(newStatus)) {
      this.status = newStatus
      return true
    }
    return false
  }
}

export default Ticket
