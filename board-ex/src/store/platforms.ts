import { createSlice } from "@reduxjs/toolkit"

import type { IPlatformState } from "~src/types/IPlatform"

const initialState: IPlatformState = {
  platforms: null,
}
 
const platformSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPlatforms(state, {payload}) {
      state.platforms = payload;
    },
  }
})
 
export const { setPlatforms } = platformSlice.actions

export const platformsSelector = state => state.platform.platforms

export default platformSlice.reducer