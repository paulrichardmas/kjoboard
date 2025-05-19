import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

import Banner from "./components/Banner/Banner";
import router from "./router/router";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Banner />
    </Provider>
  );
}

export default App;
