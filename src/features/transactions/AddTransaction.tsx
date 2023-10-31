import { FormEvent, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { addDoc } from "@firebase/firestore"
import { auth, transactionsCollection } from "../../lib/firebase"
import { TransactionType } from "../../global"
import { useDispatch } from "react-redux"

const initialState: TransactionType = {
  transactionParty: "",
  transactionAmount: 0,
  transactionNumber: 0,
  transactionDate: "",
  transactionDescription: "",
  transactionType: "Expense",
  transactionCategory: "",
  newBalance: 0,
  transactionStatus: "Pending",
  userId: "",
}

export default function AddTransaction() {
  const [form, setForm] = useState<TransactionType>(initialState)
  const dispatch = useDispatch()

  const createNewTransaction = async (e: FormEvent) => {
    //Stop the form from refreshing the page
    e.preventDefault()

    //Add the new transaction to the database
    const newTransaction = await addDoc(transactionsCollection, {
      transactionParty: form.transactionParty,
      transactionAmount: form.transactionAmount,
      transactionDate: form.transactionDate,
      transactionCategory: form.transactionCategory,
      transactionType: form.transactionType,
      newBalance: form.newBalance,
      transactionStatus: form.transactionStatus,
      userId: auth.currentUser?.uid,
    })

    //Add the new transaction to the store
    dispatch({
      type: "transactions/addTransaction",
      payload: {
        transactionNumber: newTransaction.id,
        transactionParty: form.transactionParty,
        transactionAmount: form.transactionAmount,
        transactionDate: form.transactionDate,
        transactionCategory: form.transactionCategory,
        transactionType: form.transactionType,
        newBalance: form.newBalance,
        transactionStatus: form.transactionStatus,
        userId: auth.currentUser?.uid,
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger>+</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account.
          </DialogDescription>
        </DialogHeader>
        <form
          className=" flex flex-col gap-4"
          onSubmit={(e) => createNewTransaction(e)}
        >
          <label htmlFor="" className=" flex flex-col gap-2">
            Category
            <input
              type="text"
              className=" border-input border p-2 rounded-md text-black"
              value={form.transactionCategory}
              onChange={(e) =>
                setForm({ ...form, transactionCategory: e.target.value })
              }
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Transaction Name
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
            Transaction Description
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
          <DialogTrigger type="submit">Create</DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  )
}
