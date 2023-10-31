import { signInWithEmailAndPassword } from "@firebase/auth"
import React, { useState } from "react"
import { auth } from "../lib/firebase"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        //redirect to dashboard
        navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-[#4012b9] ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" max-w-[500px] p-8 flex flex-col gap-4 w-full rounded-md border-2  border-slate-300"
      >
        <h1 className=" text-center text-2xl">Login</h1>
        <label className=" flex flex-col gap-2">
          <span className=" text-lg">Email</span>
          <input
            type="email"
            value={form.email}
            autoComplete="username"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className=" text-black rounded-md p-1 border-input border"
          />
        </label>
        <label className=" flex flex-col gap-2">
          <span className=" text-lg">Password</span>
          <input
            type="password"
            value={form.password}
            autoComplete="current-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className=" text-black rounded-md p-1 border-input border"
          />
        </label>
        <Button type="submit">Login Now</Button>
        <p className=" text-center">
          Need an account?{" "}
          <a href="/register" className=" underline">
            Create an account.
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login
