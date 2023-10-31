import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { DocumentData, addDoc } from "@firebase/firestore"
import { transactionsCollection, auth } from "../../lib/firebase"
import { getDocs, query, where } from "firebase/firestore"
import { TransactionType } from "../../global"
import { ac, s } from "vitest/dist/types-e3c9754d.js"

type TransactionSliceType = {
  transactions: TransactionType[]
  lastMonthsIncome: number
  lastWeeksIncome: number
  lastWeeksTransactionsSum: number
  lastMonthsTransactionsSum: number
  status: "idle" | "loading" | "success" | "failed"
}

const initialState: TransactionSliceType = {
  transactions: [
    {
      transactionParty: "Home Depot",
      transactionAmount: 1000,
      transactionNumber: 900,
      transactionDate: new Date().toLocaleDateString(),
      transactionCategory: "Home",
      transactionType: "Expense",
      newBalance: 900,
      transactionStatus: "Completed",
      transactionDescription: "Bought a new fridge",
      userId: "123",
    },
  ],
  lastMonthsIncome: 0,
  lastWeeksIncome: 0,
  lastWeeksTransactionsSum: 0,
  lastMonthsTransactionsSum: 0,
  status: "loading",
}

export const getAllTransactionsAsync = createAsyncThunk(
  "transactions/getAllTransactions",
  async (): Promise<TransactionType[]> => {
    const q = query(
      transactionsCollection,
      where("userId", "==", auth.currentUser?.uid || ""),
    )

    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as TransactionType[]
    return data
  },
)

const calculateLastWeeksIncome = (transactions: TransactionType[]) => {
  const lastWeeksIncome = transactions
    .filter(
      (transaction) =>
        transaction.transactionType === "Income" &&
        new Date(transaction.transactionDate) >=
          new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    )
    .reduce((acc, transaction) => acc + transaction.transactionAmount, 0)

  return lastWeeksIncome
}

const calculateLastWeeksTransactionsSum = (transactions: TransactionType[]) => {
  const lastWeeksTransactionsSum = transactions
    .filter(
      (transaction) =>
        transaction.transactionType === "Income" &&
        new Date(transaction.transactionDate) >=
          new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    )
    .reduce((acc, transaction) => acc + transaction.transactionAmount, 0)

  return lastWeeksTransactionsSum
}

const calculateLastMonthsIncome = (transactions: TransactionType[]) => {
  const lastMonthsIncome = transactions
    .filter(
      (transaction) =>
        transaction.transactionType === "Income" &&
        new Date(transaction.transactionDate) >=
          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    )
    .reduce((acc, transaction) => acc + transaction.transactionAmount, 0)

  return lastMonthsIncome
}

const calculateLastMonthsTransactionsSum = (
  transactions: TransactionType[],
) => {
  const lastMonthsTransactionsSum = transactions
    .filter(
      (transaction) =>
        transaction.transactionType === "Expense" &&
        new Date(transaction.transactionDate) >=
          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    )
    .reduce((acc, transaction) => acc + transaction.transactionAmount, 0)

  return lastMonthsTransactionsSum
}

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addNewTransaction: (state, action) => {
      console.log(action.payload)
      state.transactions.push(action.payload)
      //state.transactions = state.transactions.concat(action.payload)

      //Update the last week and last months income and transactions sum
      state.lastWeeksIncome = calculateLastWeeksIncome(state.transactions)
      state.lastWeeksTransactionsSum = calculateLastWeeksTransactionsSum(
        state.transactions,
      )
      state.lastMonthsIncome = calculateLastMonthsIncome(state.transactions)
      state.lastMonthsTransactionsSum = calculateLastMonthsTransactionsSum(
        state.transactions,
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionsAsync.fulfilled, (state, action) => {
      state.transactions = action.payload
      state.lastWeeksIncome = calculateLastWeeksIncome(state.transactions)
      state.lastWeeksTransactionsSum = calculateLastWeeksTransactionsSum(
        state.transactions,
      )
      state.lastMonthsIncome = calculateLastMonthsIncome(state.transactions)
      state.lastMonthsTransactionsSum = calculateLastMonthsTransactionsSum(
        state.transactions,
      )

      state.status = "success"
    })
  },
})

export const { addNewTransaction } = transactionsSlice.actions

export const selectTransactions = (state: RootState) => state.transactions

export default transactionsSlice.reducer
