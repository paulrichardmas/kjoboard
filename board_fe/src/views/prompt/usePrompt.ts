import axios from "../../axios";
import { useState, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux";
import { setBanner, removeBanner } from "../../store/banner";
import { IPrompt } from "../../types/IPrompt";

export const usePrompt = () => {
  const dispatch = useDispatch();
  const [promptFields, setPromptFieldss] = useState([])
  const [prompts, setPrompts] = useState<IPrompt[]>([])
  const [prompt, setPrompt] = useState("")
  const format_prompts = useMemo(() => {
    return promptFields.map((item) => ({
      value: item,
      placed: prompt.indexOf(`{${item}}`) >= 0
    }))
  }, [promptFields, prompt]);

  useEffect(() => {
    (async () => {
      dispatch(setBanner());
      try {
        const res = await axios.get("/prompts/fields/");
        setPromptFieldss(res.data)
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(removeBanner());
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      dispatch(setBanner());
      try {
        const res = await axios.get("/prompts/");
        setPrompts(res.data)
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(removeBanner());
      }
    })();
  }, [])

  const savePromptAsync = async () => {
    if (!prompt) return;
    dispatch(setBanner());
    try {
      const res = await axios.post("/prompts/", {
        text: prompt
      });
      setPrompts([...prompts, res.data])
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  }

  const updatePromptAsync = async (prompt: IPrompt, updateText: string) => {
    if (!prompt) return;
    dispatch(setBanner());
    try {
      const res = await axios.patch(`/prompts/${prompt.promptId}/`, {
        text: updateText
      });
      setPrompts(prompts.map(item => item.promptId === prompt.promptId ? res.data : item))
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  }

  const deletePromptAsync = async (promptId: string) => {
    dispatch(setBanner());
    try {
      const res = await axios.delete(`/prompts/${promptId}/`);
      setPrompts(prompts.filter(item => item.promptId !== promptId))
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeBanner());
    }
  }

  return {
    prompt,
    prompts,
    promptFields,
    format_prompts,
    setPrompt,
    savePromptAsync,
    updatePromptAsync,
    deletePromptAsync
  }
}