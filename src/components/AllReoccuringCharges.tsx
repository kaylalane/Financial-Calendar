import AddReoccuringTask from "./AddReoccuringTask"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { selectCustomer } from "../features/user/customerSlice"
import { useAppSelector } from "../app/hooks"
import { reoccurringChargesType } from "../global"

export default function AllReoccuringCharges() {
  const customer = useAppSelector(selectCustomer)

  return (
    <div className=" my-4">
      <div className=" flex justify-between items-center">
        <span className=" flex gap-4">
          <h2 className=" text-xl font-semibold">Reoccuring charges</h2>
          <AddReoccuringTask />
        </span>
        <p>${customer.reoccuringChargesSum}</p>
      </div>
      <Table>
        <TableCaption>A list of your reoccuring.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Amonut</TableHead>
            <TableHead>Day of Month</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customer.reoccuringCharges.map((charge: reoccurringChargesType) => (
            <TableRow key={charge.name}>
              <TableCell>{charge.name}</TableCell>
              <TableCell>${charge.amount}</TableCell>
              <TableCell>{charge.dayOfMonth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <table>
        <tbody></tbody>
      </table>
    </div>
  )
}
