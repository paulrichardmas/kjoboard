import { createMemoryRouter } from "~node_modules/react-router/dist/development";
import Login from "~src/views/login/Login";
import Dashboard from "~src/views/dashboard/Dashboard";

const router = createMemoryRouter([
  { path: "/", Component: Dashboard},
  { path: "login", Component: Login},
])

export default router;