import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

const AddReoccuringTask = () => {
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
        <form className=" flex flex-col gap-4">
          <label htmlFor="" className=" flex flex-col gap-2">
            Name of Charge
            <input
              type="text"
              className=" border-input border p-2 rounded-md"
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Amount of Charge
            <input
              type="number"
              className=" border-input border p-2 rounded-md"
            />
          </label>
          <label htmlFor="" className=" flex flex-col gap-2">
            Day the Charge Applies
            <input
              type="number"
              min="0"
              max="30"
              className=" border-input border p-2 rounded-md"
            />
          </label>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddReoccuringTask
