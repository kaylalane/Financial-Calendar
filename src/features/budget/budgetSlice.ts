import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../lib/firebase"

const initialState: BudgetSliceType = {
  reoccuringCharges: [],
  reoccuringChargesSum: 0,
  balance: 0,
  savings: 0,
  budget: [],
  totalBudgetLimit: 0,
  status: "loading",
}

//Get the customer account
export const getBudget = createAsyncThunk(
  "customer/getCustomerAccount",
  async (): Promise<DocumentData | null> => {
    //Set the path to the customer doc with the current user id
    const docPath = doc(db, "customers", auth.currentUser?.uid || "")

    //Get the customer doc
    const account = await getDoc(docPath)

    //Get the data from the response
    const data = account?.data() || null

    //Create a budget object
    const budget = {
      reoccuringCharges: data?.reoccuringCharges,
      reoccuringChargesSum: data?.reoccuringChargesSum,
      balance: data?.balance,
      savings: data?.savings,
      budget: data?.budget,
    }

    //Return the budget object
    return budget
  },
)

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    changeBudgetLimit: (state, action) => {
      state.totalBudgetLimit = action.payload
    },
    addBudgetCategory: (state, action) => {
      state.budget.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBudget.fulfilled, (state, action) => {
      state.balance = action.payload?.balance
      state.savings = action.payload?.savings
      state.reoccuringCharges = action.payload?.reoccuringCharges
      state.reoccuringChargesSum = action.payload?.reoccuringChargesSum
      state.budget = action.payload?.budget
      state.status = "success"
    })
  },
})

//export budget actions
export const { changeBudgetLimit } = budgetSlice.actions

//export the budget slice
export const selectBudget = (state: RootState) => state.budget

//export the budget reducer
export default budgetSlice.reducer

//Types
type BudgetSliceType = {
  reoccuringCharges: []
  reoccuringChargesSum: number
  balance: number
  savings: number
  budget: BudgetItemType[]
  totalBudgetLimit: number
  status: "idle" | "loading" | "success" | "failed"
}

export type BudgetItemType = {
  category: string
  limit: number
  spent: number
}
