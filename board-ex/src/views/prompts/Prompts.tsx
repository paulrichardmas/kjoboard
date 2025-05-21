import { ProtectedRoute } from "~src/layout/ProtectedRoute"

import Layout from "../../layout/Layout"
import { usePrompts } from "./usePrompts"

const Prompts = () => {
  const { prompt, prompts, setPromptDispatch } = usePrompts()

  const handleSelectPrompt = (prompt) => {
    setPromptDispatch(prompt)
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex flex-col gap-2">
          {prompts.map((item) => (
            <p
              key={item.promptId}
              className={`rounded-lg p-2 hover:cursor-pointer ${item.promptId === prompt?.promptId ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleSelectPrompt(item)}>
              {item.text}
            </p>
          ))}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default Prompts
