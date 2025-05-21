import React from "react";
import Layout from "../../layout/Layout";
import Card from "../../components/Card/Card";
import TextArea from "../../components/Input/TextArea";
import { ProtectedRoute } from "../../layout/ProtectedRoute";
import { usePrompt } from "./usePrompt";

const Prompt = () => {
  const { prompts } = usePrompt();
  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex gap-2">
          <Card>
            <p className="font-semibold">Prompt fields</p>
            <ul>
              {prompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </Card>
          <Card className="w-full">
            <p className="font-semibold">Prompt area</p>
            <TextArea />
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Prompt;
