import axios from "../../axios";
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { setBanner, removeBanner } from "../../store/banner";

export const usePrompt = () => {
  const dispatch = useDispatch();
  const [prompts, setPrompts] = useState([])
  useEffect(() => {
    (async () => {
      dispatch(setBanner());
      try {
        const res = await axios.get("/prompts/fields/");
        setPrompts(res.data)
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(removeBanner());
      }
    })();
  }, [])


  return {
    prompts
  }
}