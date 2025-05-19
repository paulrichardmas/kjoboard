import {
  useDispatch
} from "react-redux"
import { useNavigate } from "react-router";

import axios from "../../axios";
import type { IRegisterForm } from "./IRegister";

import { setBanner, removeBanner } from "../../store/banner";

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const registerAsync = async (data: IRegisterForm) => {
    dispatch(setBanner());
    try {
      const res = await axios.post("/accounts/register/", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  }

  return {
    registerAsync
  }
}