import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState: reoccurringChargesState = {
  allReoccurringCharges: [
    { name: "Spotify + Hulu", amount: 6.82, dayOfMonth: 5 },
    { name: "Netflix", amount: 13.99, dayOfMonth: 15 },
  ],
  sumOfReoccurringCharges: 20.81,
}
export const reoccuringChargesSlice = createSlice({
  name: "reoccurring",
  initialState,
  reducers: {
    addReoccuringCharge: (state, action) => {
      const { charge } = action.payload
      state.allReoccurringCharges.push(charge)
      state.sumOfReoccurringCharges += charge.amount
    },
  },
})

export const { addReoccuringCharge } = reoccuringChargesSlice.actions

export const selectReoccuringChargesOverview = (state: RootState) =>
  state.reoccuringCharges

export default reoccuringChargesSlice.reducer
