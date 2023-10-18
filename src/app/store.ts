import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import userReducer from "../features/user/userSlice"
import financialReducer from "../features/financialOverview/financialOverviewSlice"
import reoccuringChargesReducer from "../features/reoccuringCharges/ReoccuringChargesSlice"
import transactionsReducer from "../features/transactions/TransactionsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    financial: financialReducer,
    user: userReducer,
    reoccuringCharges: reoccuringChargesReducer,
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
