"use client"

import { useState } from "react"

interface Ticket {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "Abierto" | "En proceso" | "Cerrado"
  date: string
  userId: string
}

interface TicketListProps {
  tickets: Ticket[]
  onSelectTicket: (ticket: Ticket) => void
}

export default function TicketList({ tickets, onSelectTicket }: TicketListProps) {
  const [filter, setFilter] = useState<"all" | "Abierto" | "En proceso" | "Cerrado">("all")

  const filteredTickets = filter === "all" ? tickets : tickets.filter((t) => t.status === filter)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive"
      case "medium":
        return "bg-secondary/10 text-secondary"
      case "low":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abierto":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "En proceso":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "Cerrado":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {["all", "Abierto", "En proceso", "Cerrado"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {status === "all" ? "Todos" : status}
          </button>
        ))}
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">No hay tickets para mostrar</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => onSelectTicket(ticket)}
              className="text-left p-4 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-2">{ticket.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${getPriorityColor(ticket.priority)}`}
                  >
                    {ticket.priority === "low" ? "Baja" : ticket.priority === "medium" ? "Media" : "Alta"}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{ticket.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
