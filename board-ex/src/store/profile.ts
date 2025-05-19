import { createSlice } from "@reduxjs/toolkit"

import type { IProfileState } from "~src/types/IProfile"

const initialState: IProfileState = {
  profiles: [],
  profile: {}
}
 
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfiles(state, {payload}) {
      state.profiles = payload;
    },
    setProfile(state, {payload}) {
      state.profile = payload;
    }
  }
})
 
export const { setProfiles, setProfile } = profileSlice.actions

export const profilesSelector = state => state.profile.profiles
export const profileSelector = state => state.profile.profile

export default profileSlice.reducer