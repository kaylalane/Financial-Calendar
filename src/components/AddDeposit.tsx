import { FormEvent, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { addDoc } from "@firebase/firestore"
import { auth, transactionsCollection } from "../lib/firebase"
import { v4 as uuid } from "uuid"
import { TransactionType } from "../global"

const initialState: TransactionType = {
  transactionParty: "",
  transactionAmount: 0,
  transactionNumber: new Date().getTime(),
  transactionDate: "",
  transactionDescription: "",
  transactionType: "Income",
  transactionCategory: "Income",
  newBalance: 0,
  transactionStatus: "Pending",
  userId: "",
}

export default function AddDeposit() {
  const [form, setForm] = useState<TransactionType>(initialState)

  const createNewTransaction = async (e: FormEvent) => {
    e.preventDefault()
    const newTransaction = await addDoc(transactionsCollection, {
      transactionParty: form.transactionParty,
      transactionAmount: form.transactionAmount,
      transactionNumber: form.transactionNumber,
      transactionDate: form.transactionDate,
      transactionCategory: form.transactionCategory,
      transactionType: form.transactionType,
      newBalance: form.newBalance,
      transactionStatus: form.transactionStatus,
      userId: auth.currentUser?.uid,
    })
  }

  return (
    <Dialog>
      <DialogTrigger>New Deposit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Deposit</DialogTitle>
          <DialogDescription>
            Add a new deposit to your account.
          </DialogDescription>
        </DialogHeader>
        <form
          className=" flex flex-col gap-4"
          onSubmit={(e) => createNewTransaction(e)}
        >
          <label htmlFor="" className=" flex flex-col gap-2">
            Deposit Name
            <input
              type="text"
              className=" border-input border p-2 rounded-md text-black"
              value={form.transactionParty}
              onChange={(e) =>
                setForm({ ...form, transactionParty: e.target.value })
              }
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Deposit Description
            <input
              type="text"
              className=" border-input border p-2 rounded-md text-black"
              value={form.transactionDescription}
              onChange={(e) =>
                setForm({ ...form, transactionDescription: e.target.value })
              }
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Amount
            <input
              type="number"
              className=" border-input border p-2 rounded-md text-black"
              value={form.transactionAmount}
              onChange={(e) =>
                setForm({ ...form, transactionAmount: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Date
            <input
              type="date"
              min="0"
              max="30"
              className=" border-input border p-2 rounded-md text-black"
              value={form.transactionDate}
              onChange={(e) =>
                setForm({ ...form, transactionDate: e.target.value })
              }
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
