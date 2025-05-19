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

const storageInfo = localStorage.getItem("authInfo")

const initialState: AuthState = storageInfo ? JSON.parse(storageInfo) : {
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
      localStorage.setItem("authInfo", JSON.stringify({
        tokens: state.tokens,
        user: state.user
      }))
    },
    removeAuthState(state) {
      state.tokens = initialState.tokens;
      state.user = initialState.user;
      localStorage.removeItem("authInfo");
    }
  }
})
 
export const { setAuthState, removeAuthState } = authSlice.actions

export const authTokenSelector = state => state.auth.tokens
export const usernameSelector = state => state.auth.user?.username

export default authSlice.reducer