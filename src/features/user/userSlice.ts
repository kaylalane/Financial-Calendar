import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface User {
  username: string
  userInitials: string
  name: string
  email: string
  accountTier: "Gold" | "Bronze" | "Silver"
}

const initialState: User = {
  username: "Person",
  userInitials: "JD",
  name: "Jane Doe",
  email: "user@mail.com",
  accountTier: "Gold",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUsername: (state, action) => {
      state.username = action.payload.username
    },
  },
})

export const { changeUsername } = userSlice.actions

export default userSlice.reducer
