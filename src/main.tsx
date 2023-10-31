import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import App from "./App"
import { onAuthStateChanged } from "firebase/auth"
import { getAllTransactionsAsync } from "./features/transactions/TransactionsSlice"
import { auth } from "./lib/firebase"
import { getCustomerAccount } from "./features/user/customerSlice"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./routes/Dashboard"
import Login from "./routes/Login"
import HomePage from "./routes/HomePage"
import Register from "./routes/Register"
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(getAllTransactionsAsync())
    store.dispatch(getCustomerAccount())
  } else {
    console.log("No user logged in")
    window.location.replace("/login")
  }
})

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
