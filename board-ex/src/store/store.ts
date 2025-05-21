import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { localStorage } from "redux-persist-webextension-storage"

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  RESYNC
} from "@plasmohq/redux-persist"
import { Storage } from "@plasmohq/storage"

import authSlice from "./auth"
import bannerSlice from "./banner"
import platformsSlice from "./platforms"
import profileSlice from "./profile"
import promptSlice from "./prompt"

const rootReducer = combineReducers({
  auth: authSlice,
  banner: bannerSlice,
  profile: profileSlice,
  platform: platformsSlice,
  prompt: promptSlice
})

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          RESYNC
        ]
      }
    })
})
export const persistor = persistStore(store)

// This is what makes Redux sync properly with multiple pages
// Open your extension's options page and popup to see it in action
new Storage().watch({
  [`persist:${persistConfig.key}`]: () => {
    persistor.resync()
  }
})
