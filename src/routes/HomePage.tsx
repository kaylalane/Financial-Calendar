import React from "react"
import { useLocation, Navigate } from "react-router-dom"
import { auth } from "../lib/firebase"

export default function HomePage() {
  const location = useLocation()
  if (auth.currentUser) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }
  return (
    <div>
      <h1>Welcome to our Financial Calendar!</h1>
      <p>Plan your finances with ease using our powerful financial calendar.</p>
      <ul>
        <li>Track your income and expenses</li>
        <li>Set reminders for upcoming bills and payments</li>
        <li>View your financial history and trends</li>
        <li>Sync with your bank accounts and credit cards</li>
      </ul>
      <button>Get Started</button>
    </div>
  )
}
