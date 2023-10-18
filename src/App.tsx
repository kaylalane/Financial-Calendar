import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./routes/Dashboard"
import Login from "./routes/Login"
import HomePage from "./routes/HomePage"
import Register from "./routes/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

export default function App() {
  return (
    <div className=" min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}
