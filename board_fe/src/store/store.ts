import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { localStorage } from "redux-persist-webextension-storage"
 
import authSlice from "./auth"
import bannerSlice from "./banner"
import profileSlice from "./profile"
import platformsSlice from "./platforms"
import jobSlice from "./job"
 
const rootReducer = combineReducers({
  auth: authSlice,
  banner: bannerSlice,
  profile: profileSlice,
  platform: platformsSlice,
  job: jobSlice
})
 
export const store = configureStore({
  reducer: rootReducer,
})