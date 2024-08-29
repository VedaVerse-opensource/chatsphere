import React, { useState } from "react";
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
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

const Prompt = ({ selectedModel, chatActive, onChatStart }) => {
  const [inputText, setInputText] = useState("");
  const [responses, setResponses] = useState([]);
  const [context, setContext] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    if (!chatActive) {
      onChatStart();
    }

    setIsLoading(true);
    const newUserResponse = { type: "user", text: inputText };
    setResponses((prev) => [...prev, newUserResponse]);
    setInputText("");

    const updatedContext = { ...context, [responses.length]: newUserResponse };
    console.log(selectedModel);
    let content;
    try {
      switch (selectedModel) {
        case "Groq - Llama 70b":
          content = await groqResponse(inputText, updatedContext);
          break;
        case "gpt-4o":
          content = await gpt4oResponse(inputText);
          break;
        case "gpt-4":
          content = await gpt4Response(inputText);
          break;
        case "gpt-4o-mini":
          content = await gpt4oMiniResponse(inputText);
          break;
        case "gpt-3.5-turbo":
          content = await gpt35TurboResponse(inputText);
          break;
        case "gemini-1.5-pro":
          content = await gemini15ProResponse(inputText);
          break;
        case "gemini-1.5-flash":
          content = await gemini15FlashResponse(inputText);
          break;
        case "gemini-1.0-pro":
          content = await gemini10ProResponse(inputText);
          break;
        default:
          content = "Unsupported model selected";
      }

      const newAIResponse = { type: "ai", text: content };
      setResponses((prev) => [...prev, newAIResponse]);
      setContext({ ...updatedContext, [responses.length + 1]: newAIResponse });
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorResponse = { type: "ai", text: "An error occurred while fetching the response. Please try again." };
      setResponses((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-3xl mx-auto my-12">
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
