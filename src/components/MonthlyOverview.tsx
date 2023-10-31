
import Card from "./ui/card"
import { useAppSelector } from "../app/hooks"
import { selectTransactions } from "../features/transactions/TransactionsSlice"
import { selectCustomer } from "../features/user/customerSlice"

export default function MonthlyOverview() {
  const transactions = useAppSelector(selectTransactions)
  const savings = useAppSelector(selectCustomer).savings

  return (
    <div className=" flex gap-2">
      <Card className=" flex-1">
        <h2 className=" text-sm">Monthly Expenses</h2>
        <p className=" sm:text-3xl mt-2">
          ${transactions.lastMonthsTransactionsSum}
        </p>
      </Card>
      <Card className=" flex-1">
        <h2 className=" text-sm">Monthly Income</h2>
        <p className=" sm:text-3xl mt-2">${transactions.lastMonthsIncome}</p>
      </Card>
      <Card className=" flex-1">
        <h2 className=" text-sm">Monthly Savings</h2>
        <p className=" sm:text-3xl mt-2">${savings}</p>
      </Card>
    </div>
  )
}
