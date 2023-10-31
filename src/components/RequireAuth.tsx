import { auth } from "../lib/firebase"
import { useLocation, Navigate } from "react-router-dom"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()

  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
