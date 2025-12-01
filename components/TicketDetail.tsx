"use client"

interface Ticket {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "Abierto" | "En proceso" | "Cerrado"
  date: string
  userId: string
}

interface TicketDetailProps {
  ticket: Ticket
  onBack: () => void
  onStatusChange: (ticketId: string, newStatus: "Abierto" | "En proceso" | "Cerrado") => void
}

export default function TicketDetail({ ticket, onBack, onStatusChange }: TicketDetailProps) {
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

  const nextStatuses: Record<string, "Abierto" | "En proceso" | "Cerrado"> = {
    Abierto: "En proceso",
    "En proceso": "Cerrado",
    Cerrado: "Abierto",
  }

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-primary hover:text-primary/80 font-medium transition-colors">
        ← Volver a la lista
      </button>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{ticket.title}</h1>
          <div className="flex gap-3 flex-wrap">
            <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${getPriorityColor(ticket.priority)}`}>
              Prioridad: {ticket.priority === "low" ? "Baja" : ticket.priority === "medium" ? "Media" : "Alta"}
            </span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
            <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-muted text-muted-foreground">
              {ticket.date}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Descripción</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="font-semibold text-foreground">Cambiar estado</h3>
          <div className="flex gap-2 flex-wrap">
            {["Abierto", "En proceso", "Cerrado"].map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(ticket.id, status as "Abierto" | "En proceso" | "Cerrado")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  ticket.status === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            ID del ticket: <span className="font-mono text-foreground">{ticket.id}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Usuario: <span className="font-mono text-foreground">{ticket.userId}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
