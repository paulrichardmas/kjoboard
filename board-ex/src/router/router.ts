import { createMemoryRouter } from "~node_modules/react-router/dist/development"
import Dashboard from "~src/views/dashboard/Dashboard"
import Login from "~src/views/login/Login"
import Prompts from "~src/views/prompts/Prompts"

const router = createMemoryRouter([
  { path: "/", Component: Dashboard },
  { path: "login", Component: Login },
  { path: "prompts", Component: Prompts }
])

export default router
