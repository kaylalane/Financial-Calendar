import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { auth, db } from "../../lib/firebase"
import { useState } from "react"
import { Button } from "../../components/ui/button"

const AddReoccuringTask = () => {
  const [charges, setCharges] = useState({
    name: "",
    amount: "",
    dayOfMonth: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const docRef = doc(db, "customers", auth.currentUser?.uid || "")
    await updateDoc(docRef, {
      reoccuringCharges: arrayUnion({
        name: charges.name,
        amount: Number(charges.amount),
        dayOfMonth: Number(charges.dayOfMonth),
      }),
    })
  }
  return (
    <Dialog>
      <DialogTrigger>+</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Reoccuring Charge</DialogTitle>
          <DialogDescription>
            Add a new monthly reoccuring charge to your account.
          </DialogDescription>
        </DialogHeader>
        <form
          className=" flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="" className=" flex flex-col gap-2">
            Name of Charge
            <input
              type="text"
              value={charges?.name}
              onChange={(e) => setCharges({ ...charges, name: e.target.value })}
              className=" border-input border p-2 rounded-md"
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Amount of Charge
            <input
              type="number"
              value={charges?.amount}
              onChange={(e) =>
                setCharges({ ...charges, amount: e.target.value })
              }
              className=" border-input border p-2 rounded-md"
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Day the Charge Applies
            <input
              type="number"
              value={charges?.dayOfMonth}
              onChange={(e) =>
                setCharges({ ...charges, dayOfMonth: e.target.value })
              }
              min="0"
              max="30"
              className=" border-input border p-2 rounded-md"
            />
          </label>
          <DialogTrigger>
            <Button type="submit">Submit</Button>
          </DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddReoccuringTask
