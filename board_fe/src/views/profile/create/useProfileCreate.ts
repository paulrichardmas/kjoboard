import {
  useDispatch
} from "react-redux"
import { useNavigate } from "react-router";

import axios from "../../../axios";
import { IProfile } from "../../../types/IProfile";
import { setBanner, removeBanner } from "../../../store/banner";

export const useProfileCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const createProfileAsync = async (data: IProfile) => {
    console.log(data)
    dispatch(setBanner());
    try {
      const res = await axios.post("/accounts/profile/", data);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  }

  return {
    createProfileAsync
  }
};