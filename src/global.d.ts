/** ALL REDUX TYPES */
declare type AccountType = {
  reoccuringCharges: reoccurringChargesType[]
  reoccuringChargeSum: number
  userId: number
  balance: number
}

declare type TransactionType = {
  transactionParty: string
  transactionAmount: number
  transactionNumber: number
  transactionDescription: string
  transactionDate: string
  transactionType: "Income" | "Expense"
  transactionCategory: string
  newBalance: number
  transactionStatus: "Pending" | "Completed" | "Canceled"
  userId: string
}

declare type reoccurringChargesType = {
  dayOfMonth: number
  amount: number
  name: string
}

/** ALL REDUX STATES */
declare interface TransactionState {
  transactions: TransactionType[]
  status: "idle" | "loading" | "failed"
}

declare interface financialOverviewState {
  bankAccount1Balance: number
  totalEarnings: number
  totalSpending: number
  reoccuringChargesSum: number
  monthlyGoal: number
  transactionCount: number
  transactions: TransactionType[]
}

declare interface reoccurringChargesState {
  allReoccurringCharges: reoccurringChargesType[]
  sumOfReoccurringCharges: number
}
