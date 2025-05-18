import { useEffect } from "react"

import { useSelector } from "~node_modules/react-redux/dist/react-redux"
import { useNavigate } from "~node_modules/react-router/dist/development"
import { authTokenSelector } from "~src/store/auth"

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const tokens = useSelector(authTokenSelector)

  useEffect(() => {
    if (!tokens?.access) {
      navigate("/login")
    }
  }, [tokens, navigate])

  if (!tokens?.access) {
    return null
  } else {
    return children
  }
}
