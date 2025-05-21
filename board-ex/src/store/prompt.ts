import { createSlice } from "@reduxjs/toolkit"

import type { IPromptState } from "~src/types/IPrompt"

const initialState: IPromptState = {
  prompts: [],
  prompt: undefined
}

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompts(state, { payload }) {
      state.prompts = payload
    },
    setPrompt(state, { payload }) {
      state.prompt = payload
    }
  }
})

export const { setPrompts, setPrompt } = promptSlice.actions

export const promptsSelector = (state) => state.prompt.prompts
export const promptSelector = (state) => state.prompt.prompt

export default promptSlice.reducer
