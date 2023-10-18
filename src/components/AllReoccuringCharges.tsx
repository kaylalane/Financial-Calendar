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
import { useEffect, useState } from "react"
import { getDocs, query, where } from "firebase/firestore"
import { accountsCollection, auth } from "../lib/firebase"

export default function AllReoccuringCharges() {
  const [charges, setCharges] = useState<reoccurringChargesType[]>([])

  const fetchCharges = () => {
    //query for todos with user uids
    const q = query(
      accountsCollection,
      where("userId", "==", auth.currentUser?.uid),
    )

    const temp: reoccurringChargesType[] = []
    getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) =>
        doc.data().reoccuringCharges.map((charge) => {
          temp.push(charge)
        }),
      )
      setCharges(temp)
    })
  }

  useEffect(() => {
    fetchCharges()
  }, [])

  return (
    <>
      <div className=" flex justify-between items-center">
        <span className=" flex gap-4">
          <h2 className=" text-xl font-semibold">Reoccuring charges</h2>
          <AddReoccuringTask />
        </span>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Amonut</TableHead>
            <TableHead>Day of Month</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {charges.map((charge) => (
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
    </>
  )
}
