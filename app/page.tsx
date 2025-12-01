"use client"

import { useState } from "react"
import TicketForm from "@/components/TicketForm"
import TicketList from "@/components/TicketList"
import TicketDetail from "@/components/TicketDetail"

interface Ticket {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "Abierto" | "En proceso" | "Cerrado"
  date: string
  userId: string
}

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      title: "Error en login",
      description: "No puedo iniciar sesión con mi cuenta",
      priority: "high",
      status: "Abierto",
      date: new Date().toISOString().split("T")[0],
      userId: "user-1",
    },
    {
      id: "2",
      title: "Solicitud de nueva funcionalidad",
      description: "Me gustaría agregar modo oscuro",
      priority: "low",
      status: "En proceso",
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      userId: "user-2",
    },
  ])

  const [view, setView] = useState<"list" | "detail">("list")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const handleAddTicket = (newTicket: Omit<Ticket, "id" | "date">) => {
    const ticket: Ticket = {
      ...newTicket,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    }
    setTickets([ticket, ...tickets])
  }

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setView("detail")
  }

  const handleUpdateStatus = (ticketId: string, newStatus: "Abierto" | "En proceso" | "Cerrado") => {
    const updatedTickets = tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket))
    setTickets(updatedTickets)

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus })
    }
  }

  const handleBackToList = () => {
    setView("list")
    setSelectedTicket(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-foreground">FixNow</h1>
            <p className="text-sm text-muted-foreground">Sistema de gestión de tickets de soporte</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {view === "list" ? (
            <div className="space-y-6">
              <TicketForm onAddTicket={handleAddTicket} />
              <TicketList tickets={tickets} onSelectTicket={handleSelectTicket} />
            </div>
          ) : (
            selectedTicket && (
              <TicketDetail ticket={selectedTicket} onBack={handleBackToList} onStatusChange={handleUpdateStatus} />
            )
          )}
        </div>
      </div>
    </main>
  )
}
