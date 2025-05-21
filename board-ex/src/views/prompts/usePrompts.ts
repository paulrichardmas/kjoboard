import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { removeBanner, setBanner } from "~src/store/banner"
import {
  promptSelector,
  promptsSelector,
  setPrompt,
  setPrompts
} from "~src/store/prompt"

import axios from "../../axios"

export const usePrompts = () => {
  const dispatch = useDispatch()
  const prompts = useSelector(promptsSelector)
  const prompt = useSelector(promptSelector)
  useEffect(() => {
    ;(async () => {
      dispatch(setBanner())
      try {
        const res = await axios.get("/prompts/")
        dispatch(setPrompts(res.data))
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(removeBanner())
      }
    })()
  }, [])

  const setPromptDispatch = (prompt) => {
    dispatch(setPrompt(prompt))
  }
  return {
    prompt,
    prompts,
    setPromptDispatch
  }
}
