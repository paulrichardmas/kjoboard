import { createBrowserRouter } from "react-router";
import Login from "../views/login/Login"
import Register from "../views/register/Register";
import Dashboard from "../views/dashboard/Dashboard";
import Profile from "../views/profile/Profile";
import ProfileCreate from "../views/profile/create/ProfileCreate";
import ProfileDetail from "../views/profile/detail/ProfileDetail"
import Platforms from "../views/platforms/Platforms";
import Prompt from "../views/prompt/Prompt";

const router = createBrowserRouter([
  { path: "/", Component: Dashboard},
  { path: "/login", Component: Login},
  { path: "/register", Component: Register},
  { path: "/profile", Component: Profile},
  { path: "/profile/create", Component: ProfileCreate},
  { path: "/profile/:profileId", Component: ProfileDetail},
  { path: "/platform", Component: Platforms},
  { path: "/prompt", Component: Prompt}
])

export default router;