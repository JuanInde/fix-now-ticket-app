// Mejora funcionalidad login
"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import TicketList from "./components/TicketList"
import TicketDetail from "./components/TicketDetail"
import CreateTicket from "./components/CreateTicket"
import "./styles/App.css"

function App() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-content">
            <Link to="/" className="navbar-logo">
              🔧 FixNow
            </Link>
            <ul className="nav-links">
              <li>
                <Link to="/">Mis Tickets</Link>
              </li>
              <li>
                <Link to="/crear" className="nav-link-create">
                  + Nuevo Ticket
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/crear" element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
