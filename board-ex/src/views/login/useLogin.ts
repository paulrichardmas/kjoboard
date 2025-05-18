import {
  useDispatch
} from "~node_modules/react-redux/dist/react-redux"
import { useNavigate } from "react-router";

import axios from "~src/axios";
import type { ILoginForm } from "./ILogin";

import { setAuthState } from "~src/store/auth";
import { setBanner, removeBanner } from "~src/store/banner";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loginAsync = async (data: ILoginForm) => {
    dispatch(setBanner());
    try {
      const res = await axios.post("/accounts/login/", data);
      dispatch(setAuthState(res.data));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  }

  return {
    loginAsync
  }
};