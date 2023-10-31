import AddTransaction from "./AddTransaction"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { selectTransactions } from "./TransactionsSlice"
import { useAppSelector } from "../../app/hooks"

export default function AllTransactions() {
  const transactions = useAppSelector(selectTransactions).transactions
  const loading = useAppSelector(selectTransactions).status === "success"

  return (
    <>
      {loading ? (
        <div className=" my-4">
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
                  <TableCell>
                    {new Date(transaction.transactionDate).toLocaleDateString()}{" "}
                  </TableCell>
                  <TableCell>{transaction.transactionParty} </TableCell>
                  <TableCell>{transaction.transactionCategory}</TableCell>
                  <TableCell className="text-right">
                    ${transaction.transactionAmount}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className=" my-4">
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
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
