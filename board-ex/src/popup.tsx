import { Provider } from "react-redux"
import { RouterProvider } from "react-router"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import Banner from "./components/Banner/Banner"
import router from "./router/router"
import { persistor, store } from "./store/store"

import "./tailwind.css"

function IndexPopup() {
  return (
    <div style={{ minWidth: "250px", minHeight: "300px" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Banner />
        </PersistGate>
      </Provider>
    </div>
  )
}

export default IndexPopup
