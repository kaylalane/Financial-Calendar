import AddTransaction from "./AddTransaction"
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
import { auth, transactionsCollection } from "../lib/firebase"

export default function AllTransactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  const fetchPost = () => {
    console.log("fetch post")

    //query for todos with user uids
    const q = query(
      transactionsCollection,
      where("userId", "==", auth.currentUser?.uid),
    )

    getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      //@ts-ignore
      setTransactions(newData)
    })
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <>
      <div className=" flex gap-4">
        <h2 className=" text-xl font-bold">Transactions</h2>
        <AddTransaction />
      </div>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transactionNumber}>
              <TableCell>{transaction.transactionDate} </TableCell>
              <TableCell>{transaction.transactionParty} </TableCell>
              <TableCell>{transaction.transactionCategory}</TableCell>
              <TableCell className="text-right">
                ${transaction.transactionAmount}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
