import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Card from "../../components/Card/Card";
import TextArea from "../../components/Input/TextArea";
import Button from "../../components/Button/Button";
import { ProtectedRoute } from "../../layout/ProtectedRoute";
import { usePrompt } from "./usePrompt";

const PromptCard = ({ prompt, onUpdate, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [promptText, setPromptText] = useState(prompt.text);
  return (
    <Card key={prompt.promptId}>
      <p>Prompt id: {prompt.promptId}</p>
      {!isUpdating && (
        <>
          <p className="bg-slate-200 rounded-lg p-2 mb-2">{prompt.text}</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setIsUpdating(true)}>Update</Button>
            <Button color="red" onClick={() => onDelete(prompt.promptId)}>
              Delete
            </Button>
          </div>
        </>
      )}
      {isUpdating && (
        <>
          <TextArea
            value={promptText}
            rows={10}
            onChange={(event) => setPromptText(event.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                onUpdate(prompt, promptText);
                setIsUpdating(false);
              }}
            >
              Save
            </Button>
            <Button color="red" onClick={() => setIsUpdating(false)}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

const Prompt = () => {
  const {
    prompts,
    prompt,
    format_prompts,
    setPrompt,
    savePromptAsync,
    updatePromptAsync,
    deletePromptAsync,
  } = usePrompt();
  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex gap-2">
          <Card>
            <p className="font-semibold">Prompt fields</p>
            <ul>
              {format_prompts.map(({ value, placed }) => (
                <li key={value} className={`${placed ? "text-red-400" : ""}`}>
                  {value}
                </li>
              ))}
            </ul>
          </Card>
          <div className="w-full flex flex-col gap-2">
            {prompts.map((item) => (
              <PromptCard
                key={item.promptId}
                prompt={item}
                onUpdate={updatePromptAsync}
                onDelete={deletePromptAsync}
              />
            ))}
            <Card>
              <p className="font-semibold">Prompt area</p>
              <TextArea
                value={prompt}
                rows={10}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <Button className="w-full" onClick={savePromptAsync}>
                Push!
              </Button>
            </Card>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Prompt;
