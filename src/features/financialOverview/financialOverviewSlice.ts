import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialTransactions: TransactionType[] = [
  {
    transactionParty: "Home Depot",
    transactionAmount: 1000,
    transactionNumber: 900,
    transactionDate: new Date(),
    transactionCategory: "Home",
    transactionType: "Expense",
    newBalance: 900,
    transactionStatus: "Completed",
    transactionDescription: "Bought a new fridge",
    user_id: "123",
  },
]

const initialState: financialOverviewState = {
  bankAccount1Balance: 41,
  totalEarnings: 900,
  totalSpending: 500,
  reoccuringChargesSum: 6.82,
  monthlyGoal: 1200,
  transactionCount: 0,
  transactions: initialTransactions,
}

export const financialSlice = createSlice({
  name: "financial",
  initialState,
  reducers: {
    changeMonthlyGoal: (state, action) => {
      state.monthlyGoal = action.payload
    },
    changeBankAccount1Balance: (state, action) => {
      state.bankAccount1Balance = action.payload
    },
    addNewTransaction: (state, action) => {
      const newTransaction = {
        transactionParty: action.payload.transactionParty,
        transactionAmount: action.payload.transactionAmount,
        transactionNumber: state.transactionCount + 1,
        transactionDate: action.payload.transactionDate,
        transactionCategory: action.payload.transactionCategory,
        transactionType: action.payload.transactionType,
        newBalance:
          state.bankAccount1Balance + action.payload.transactionAmount,
        status: "Completed",
      }
      state.transactions.push(action.payload)
      state.transactionCount += 1
    },
    addAReoccuringCharge: (state, action) => {
      state.reoccuringChargesSum += action.payload
    },
  },
})
export const {
  changeMonthlyGoal,
  changeBankAccount1Balance,
  addAReoccuringCharge,
  addNewTransaction,
} = financialSlice.actions

export const selectFinancialOverview = (state: RootState) => state.financial

export default financialSlice.reducer
