import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { DocumentData, addDoc } from "@firebase/firestore"
import { db, transactionsCollection, auth } from "../../lib/firebase"
import { collection, getDocs, query, where, setDoc } from "firebase/firestore"
import { ac } from "vitest/dist/types-e3c9754d.js"

const initialState = {
  transactions: [
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
  ],
  status: "idle",
}

export const getAllTransactionsAsync = createAsyncThunk(
  "counter/getAllTransactions",
  async () => {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", auth.currentUser?.uid),
    )

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        addNewTransaction(doc.data())
      })
    })

    // The value we return becomes the `fulfilled` action payload
  },
)

export const addNewTransactionAsync = createAsyncThunk<
  DocumentData, // Return type of the async thunk
  TransactionType, // Type of the payload
  { state: RootState }
>("counter/createTransaction", async (action) => {
  const newTransaction = await addDoc(transactionsCollection, {
    transactionParty: action.transactionParty,
    transactionAmount: action.transactionAmount,
    transactionNumber: action.transactionNumber,
    transactionDate: action.transactionDate,
    transactionCategory: action.transactionCategory,
    transactionType: action.transactionType,
    newBalance: action.newBalance,
    transactionStatus: action.transactionStatus,
  })

  // The value we return becomes the `fulfilled` action payload
  return newTransaction
})

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addNewTransaction: (state, action) => {
      state.transactions.push(action.payload)
      console.log("Transaction added")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTransactionAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addNewTransactionAsync.fulfilled, (state, action) => {
        state.status = "suceess"
        state.transactions = state.transactions.concat(action.payload)
      })
      .addCase(addNewTransactionAsync.rejected, (state) => {})
  },
})

export const { addNewTransaction } = transactionsSlice.actions

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions

export default transactionsSlice.reducer
