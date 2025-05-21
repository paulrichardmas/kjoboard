export interface IPrompt {
  promptId: string
  text: string
}

export interface IPromptState {
  prompts: IPrompt[]
  prompt: IPrompt | undefined
}
