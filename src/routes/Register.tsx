import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"
import React, { useState } from "react"
import { auth, db } from "../lib/firebase"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(async (userCredential) => {
        // Account created
        const user = userCredential.user
        updateProfile(user, {
          displayName: `${form.firstName} ${form.lastName}`,
        })

        // Create a new account for the customer
        // Add fake data for reoccuring charges
        const newAccount = await addDoc(collection(db, "accounts"), {
          balance: 0,
          userId: user.uid,
          reoccuringCharges: tempReoccuringCharges,
        })

        // Create a customer document with the auth uid as the document id
        // Add the new account to the customer document
        setDoc(doc(db, "customers", user.uid), {
          firstName: form.firstName,
          lastName: form.lastName,
          accounts: [newAccount.id],
        })

        // navigate to dashboard
        navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-[#4012b9] w-full flex justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" max-w-[500px] p-8 flex flex-col gap-4 w-full rounded-md border-2  border-slate-300"
      >
        <h1 className=" text-2xl text-center">Create an account</h1>
        <label className=" flex flex-col gap-2">
          <span className=" text-lg">First Name</span>

          <input
            type="text"
            value={form.firstName}
            autoComplete="given-name"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className=" text-black rounded-md p-1 border-input border w-full"
          />
        </label>
        <label className=" flex flex-col gap-2">
          <span className=" text-lg">Last Name</span>
          <input
            type="text"
            value={form.lastName}
            autoComplete="family-name"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className=" text-black  rounded-md p-1 border-input border"
          />
        </label>
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
            autoComplete="new-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className=" text-black rounded-md p-1 border-input border"
          />
        </label>
        <Button type="submit" className=" mt-4">
          Create An Account
        </Button>
        <p className=" text-center">
          Have an account?{" "}
          <a href="/login" className=" underline">
            Login here.
          </a>
        </p>
      </form>
    </div>
  )
}

const tempReoccuringCharges = [
  { name: "Rent", amount: 500, dayOfMonth: 1 },
  { name: "Utilities", amount: 50, dayOfMonth: 15 },
]
export default Register
