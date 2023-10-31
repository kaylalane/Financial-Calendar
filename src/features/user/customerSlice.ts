import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { reoccurringChargesType } from "../../global"
import { auth, db } from "../../lib/firebase"

export const getCustomerAccount = createAsyncThunk(
  "customer/getCustomerAccount",
  async (): Promise<DocumentData | null> => {
    const docRef = doc(db, "customers", auth.currentUser?.uid || "")
    const account = await getDoc(docRef)
    const data = account?.data() || null

    return data
  },
)

const initialState: CustomerType = {
  firstName: "Jane",
  lastName: "Doe",
  email: "user@mail.com",

  reoccuringCharges: [],
  reoccuringChargesSum: 0,
  userId: 0,
  balance: 0,
  savings: 0,
  budget: [],
  totalBudgetLimit: 0,
}

export const cusstomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    changeUsername: (state, action) => {
      state.firstName = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerAccount.fulfilled, (state, action) => {
      state.firstName = action.payload?.firstName
      state.lastName = action.payload?.lastName
      state.email = action.payload?.email
      state.userId = action.payload?.userId
      state.balance = action.payload?.balance
      state.savings = action.payload?.savings
      state.reoccuringCharges = action.payload?.reoccuringCharges
      state.reoccuringChargesSum = action.payload?.reoccuringChargesSum
      state.budget = action.payload?.budget
    })
  },
})

export const { changeUsername } = cusstomerSlice.actions

export const selectCustomer = (state: RootState) => state.customer

export default cusstomerSlice.reducer

// Customer Types
declare interface CustomerType {
  reoccuringCharges: reoccurringChargesType[]
  reoccuringChargesSum: number
  savings: number
  userId: number
  email: string
  balance: number
  firstName: string
  lastName: string
  budget: BudgetType[]
  totalBudgetLimit: number
}

type BudgetType = {
  category: string
  limit: number
  spent: number
}
