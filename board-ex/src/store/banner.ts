import { createSlice } from "@reduxjs/toolkit"
 
export interface IBannerState {
  isLoading: boolean
}

const initialState = {
  isLoading: false
}
 
const bannerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBanner(state) {
      state.isLoading = true
    },
    removeBanner(state) {
      state.isLoading = false
    }
  }
})
 
export const { setBanner, removeBanner } = bannerSlice.actions

export const bannerSelector = state => state.banner.isLoading

export default bannerSlice.reducer