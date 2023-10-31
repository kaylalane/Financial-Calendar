import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import customerReducer from "../features/user/customerSlice"
import transactionsReducer from "../features/transactions/TransactionsSlice"
import budgetReducer from "../features/budget/budgetSlice"
export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    customer: customerReducer,
    transactions: transactionsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
