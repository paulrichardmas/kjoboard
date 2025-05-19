import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authTokenSelector } from "../store/auth";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const tokens = useSelector(authTokenSelector);

  useEffect(() => {
    if (!tokens?.access) {
      navigate("/login");
    }
  }, [tokens, navigate]);

  if (!tokens?.access) {
    return null;
  } else {
    return children;
  }
};
