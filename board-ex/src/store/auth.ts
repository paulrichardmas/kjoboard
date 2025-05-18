import { createSlice } from "@reduxjs/toolkit"
 
export interface AuthState {
  tokens: {
    access: string,
    refresh: string
  },
  user: {
    id: string
    username: string
  }
}

const initialState = {
  tokens: {
    access: "",
    refresh: ""
  },
  user: {
    id: "",
    username: ""
  }
}
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, {payload}) {
      state.tokens = payload.tokens;
      state.user.username = payload.user.username;
    },
    removeAuthState(state) {
      state.tokens = initialState.tokens;
      state.user = initialState.user;
    }
  }
})
 
export const { setAuthState, removeAuthState } = authSlice.actions

export const authTokenSelector = state => state.auth.tokens

export default authSlice.reducer