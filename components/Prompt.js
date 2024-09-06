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
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = file => {
    setUploadedFile(file);
    setInputText(`Analyzing file: ${file.name}`);
  };

  const handleSend = useCallback(async () => {
    if (inputText.trim() === "" && !uploadedFile) return;

    if (!chatActive) {
      onChatStart();
    }

    setIsLoading(true);
    const newUserResponse = { type: "user", text: inputText };
    setResponses(prev => [...prev, newUserResponse]);
    setInputText("");

    const updatedContext = { ...context, [responses.length]: newUserResponse };

    let responseGenerator;
    try {
      if (uploadedFile) {
        // Process the uploaded file
        const fileContent = await readFileContent(uploadedFile);
        responseGenerator = processFileContent(fileContent, selectedModel);
      } else {
        // Use the existing chat models
        responseGenerator = getChatResponse(inputText, selectedModel);
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

      setContext({
        ...updatedContext,
        [responses.length + 1]: { ...newAIResponse, text: fullContent },
      });
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorResponse = {
        type: "ai",
        text: "An error occurred while fetching the response. Please try again.",
      };
      setResponses(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setUploadedFile(null);
    }
  }, [
    inputText,
    selectedModel,
    chatActive,
    onChatStart,
    context,
    responses,
    uploadedFile,
  ]);

  const readFileContent = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  };

  const processFileContent = (content, model) => {
    // Implement file processing logic here
    // For now, we'll just use the existing chat models
    return getChatResponse(`Analyze the following content: ${content}`, model);
  };

  const getChatResponse = (content, model) => {
    const contextMessages = Object.values(context).map(response => ({
      role: response.type === "user" ? "user" : "assistant",
      content: response.text,
    }));

    switch (model) {
      case "llama70b":
        return groqResponse(content, contextMessages);
      case "3.5sonnet":
        return getClaudeResponse(content, contextMessages);
      case "gpt-4o":
        return gpt4oResponse(content, contextMessages);
      case "gpt-4":
        return gpt4Response(content, contextMessages);
      case "gpt-4o-mini":
        return gpt4oMiniResponse(content, contextMessages);
      case "gpt-3.5-turbo":
        return gpt35TurboResponse(content, contextMessages);
      case "gemini-1.5-pro":
        return gemini15ProResponse(content, contextMessages);
      case "gemini-1.5-flash":
        return gemini15FlashResponse(content, contextMessages);
      case "gemini-1.0-pro":
        return gemini10ProResponse(content, contextMessages);
      default:
        throw new Error("Unsupported model selected");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full max-w-3xl mx-auto my-6 sm:my-8 md:my-12'>
      <ChatContainer responses={responses} />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        isLoading={isLoading}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
};

export default Prompt;
