"use client"

import type React from "react"

import { useState } from "react"

interface TicketFormProps {
  onAddTicket: (ticket: {
    title: string
    description: string
    priority: "low" | "medium" | "high"
    status: "Abierto" | "En proceso" | "Cerrado"
    userId: string
  }) => void
}

export default function TicketForm({ onAddTicket }: TicketFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert("Por favor completa todos los campos")
      return
    }

    onAddTicket({
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "Abierto",
      userId: "current-user",
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
    setIsOpen(false)
  }

  return (
    <div className="w-full">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
        >
          + Crear nuevo ticket
        </button>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-foreground mb-4">Crear nuevo ticket</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Error en la plataforma"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el problema en detalle..."
                rows={4}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Prioridad</label>
              <div className="flex gap-3">
                {["low", "medium", "high"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p as "low" | "medium" | "high")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      priority === p
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {p === "low" ? "Baja" : p === "medium" ? "Media" : "Alta"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Crear ticket
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
