import React, { useState, useCallback } from "react";
import groqResponse from "../scripts/groq";
import {
  gpt4Response,
  gpt4oResponse,
  gpt4oMiniResponse,
  gpt35TurboResponse,
} from "../scripts/chatgpt";
import {
  gemini15ProResponse,
  gemini15FlashResponse,
  gemini10ProResponse,
} from "../scripts/gemini";
import { getClaudeResponse } from "@/scripts/claude";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

const Prompt = ({ selectedModel, chatActive, onChatStart }) => {
  const [inputText, setInputText] = useState("");
  const [responses, setResponses] = useState([]);
  const [context, setContext] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async () => {
    if (inputText.trim() === "") return;

    if (!chatActive) {
      onChatStart();
    }

    setIsLoading(true);
    const newUserResponse = { type: "user", text: inputText };
    setResponses(prev => [...prev, newUserResponse]);
    setInputText("");

    const updatedContext = { ...context, [responses.length]: newUserResponse };
    console.log(selectedModel);

    let responseGenerator;
    try {
      switch (selectedModel) {
        case "llama70b":
          responseGenerator = groqResponse(inputText, updatedContext);
          break;
        case "3.5sonnet":
          responseGenerator = getClaudeResponse(inputText);
          break;
        case "gpt-4o":
          responseGenerator = gpt4oResponse(inputText);
          break;
        case "gpt-4":
          responseGenerator = gpt4Response(inputText);
          break;
        case "gpt-4o-mini":
          responseGenerator = gpt4oMiniResponse(inputText);
          break;
        case "gpt-3.5-turbo":
          responseGenerator = gpt35TurboResponse(inputText);
          break;
        case "gemini-1.5-pro":
          responseGenerator = gemini15ProResponse(inputText);
          break;
        case "gemini-1.5-flash":
          responseGenerator = gemini15FlashResponse(inputText);
          break;
        case "gemini-1.0-pro":
          responseGenerator = gemini10ProResponse(inputText);
          break;
        default:
          throw new Error("Unsupported model selected");
      }

      let fullContent = "";
      const newAIResponse = { type: "ai", text: "" };
      setResponses(prev => [...prev, newAIResponse]);

      for await (const chunk of responseGenerator) {
        fullContent += chunk;
        setResponses(prev => [
          ...prev.slice(0, -1),
          { ...newAIResponse, text: fullContent },
        ]);
      }

      setContext({ ...updatedContext, [responses.length + 1]: { ...newAIResponse, text: fullContent } });
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorResponse = {
        type: "ai",
        text: "An error occurred while fetching the response. Please try again.",
      };
      setResponses(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedModel, chatActive, onChatStart, context, responses]);

  return (
    <div className='flex flex-col justify-center items-center w-full max-w-3xl mx-auto my-12'>
      <ChatContainer responses={responses} />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Prompt;