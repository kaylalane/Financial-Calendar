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
import { accountsCollection } from "../../lib/firebase"
import { BudgetItemType } from "./budgetSlice"
import { useDispatch } from "react-redux"

const initialState: BudgetItemType = {
  category: "",
  limit: 0,
  spent: 0,
}

export default function AddBudgetCategory() {
  const [form, setForm] = useState<BudgetItemType>(initialState)
  const dispatch = useDispatch()

  const createNewTransaction = async (e: FormEvent) => {
    //Stop the form from refreshing the page
    e.preventDefault()

    //Create a new transaction in the database
    const newBudgetItem = await addDoc(accountsCollection, {
      categoty: form.category,
      limit: form.limit,
      spent: form.spent,
    })

    //Dispatch the new transaction to the store
    dispatch({ type: "budget/addBudgetItem", payload: newBudgetItem })
  }

  return (
    <Dialog>
      <DialogTrigger>Add Category</DialogTrigger>
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
            Category
            <input
              type="text"
              className=" border-input border p-2 rounded-md text-black"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Limit
            <input
              type="number"
              className=" border-input border p-2 rounded-md text-black"
              value={form.limit}
              onChange={(e) =>
                setForm({ ...form, limit: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Spent
            <input
              type="number"
              className=" border-input border p-2 rounded-md text-black"
              value={form.spent}
              onChange={(e) =>
                setForm({ ...form, spent: Number(e.target.value) })
              }
            />
          </label>

          <DialogTrigger type="submit">Create</DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  )
}
