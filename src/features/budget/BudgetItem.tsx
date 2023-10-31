import { useState } from "react"
import { BudgetItemType } from "./budgetSlice"
import clsx from "clsx"
import { useAppSelector } from "../../app/hooks"
import { selectTransactions } from "../transactions/TransactionsSlice"
import { motion } from "framer-motion"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "-10%" },
}

export default function BudgetItem(item: BudgetItemType) {
  const [showDetails, setShowDetails] = useState(false)
  const transactions = useAppSelector(selectTransactions)

  const budgetLeft = item.limit - item.spent
  const budgetSpentPercent = (item.spent / item.limit) * 100
  const isBudgetOver = budgetLeft < 0

  return (
    <div className={clsx(showDetails && " border-2 border-red-500")}>
      <div
        className={clsx(
          "budgetRow border-b px-4 py-2",
          !showDetails ? "grid grid-cols-4 " : " flex justify-between ",
          isBudgetOver && "text-red-500",
        )}
      >
        <p className="budgetRowItem">{item.category}</p>
        {!showDetails && (
          <>
            <p className="budgetRowItem ">{budgetSpentPercent.toFixed(0)}%</p>
            <p className="budgetRowItem">${budgetLeft}</p>
          </>
        )}
        <button
          className=" justify-self-end"
          onClick={() => setShowDetails(!showDetails)}
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M12 3L12 21M12 21L20.5 12.5M12 21L3.5 12.5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      {showDetails && (
        <div className="budgetDetails flex gap-2 p-2">
          <div className="budgetFigures flex flex-col basis-1/2">
            <div className=" flex justify-between py-2">
              <p>Budget</p>
              <p>${item.limit}</p>
            </div>
            <div className=" flex justify-between py-2 border-b">
              <p>- Spent</p>
              <p>${item.spent}</p>
            </div>
            <div className=" flex justify-between py-2">
              <p>Remaining</p>
              <p>${budgetLeft}</p>
            </div>
          </div>
          <div className="budgetItemTransactions basis-1/2 border border-collapse p-2">
            <p>This Month&apos;s Transactions</p>
            {transactions.transactions
              .filter(
                (transaction) =>
                  transaction.transactionCategory === item.category,
              )
              .map((transaction) => (
                <div
                  key={transaction.transactionNumber}
                  className=" flex justify-between"
                >
                  <p>{transaction.transactionParty}</p>
                  <p>${transaction.transactionAmount}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
