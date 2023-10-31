import AllTransactions from "../features/transactions/Transactions"
import Navbar from "../components/Navbar"
import Card from "../components/ui/card"
import { useAppSelector } from "../app/hooks"
import { selectTransactions } from "../features/transactions/TransactionsSlice"
import { selectCustomer } from "../features/user/customerSlice"
import Budget from "../features/budget/Budget"

export default function Dashboard() {
  const transactions = useAppSelector(selectTransactions)
  const customer = useAppSelector(selectCustomer)

  return (
    <div className=" p-4">
      <header>
        <Navbar />
      </header>
      <div className=" flex gap-2">
        <Card className=" flex-1">
          <h2 className=" text-sm">Monthly Expenses</h2>
          <p className=" sm:text-3xl mt-2">
            ${transactions.lastMonthsTransactionsSum.toFixed(2)}
          </p>
        </Card>
        <Card className=" flex-1">
          <h2 className=" text-sm">Monthly Income</h2>
          <p className=" sm:text-3xl mt-2">
            ${transactions.lastMonthsIncome.toFixed(2)}
          </p>
        </Card>
        <Card className=" flex-1">
          <h2 className=" text-sm">Monthly Savings</h2>
          <p className=" sm:text-3xl mt-2">${customer.savings.toFixed(2)}</p>
        </Card>
      </div>
      <Budget />
      <AllTransactions />
    </div>
  )
}
