import React, { useState, useCallback, useEffect } from "react";
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
import { perplexityResponse, perplexitySearch } from "../scripts/perplexity";
import exaSearch from "../scripts/exa";
import { saveChatHistory } from "@/utils/indexedDB";

const Prompt = ({
  selectedModel,
  chatActive,
  onChatStart,
  currentChat,
  onUpdateChatHistory,
}) => {
  const [inputText, setInputText] = useState("");
  const [responses, setResponses] = useState([]);
  const [context, setContext] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    if (currentChat) {
      setResponses(currentChat.messages);
      setContext(
        currentChat.messages.reduce((acc, msg, index) => {
          acc[index] = msg;
          return acc;
        }, {})
      );
    } else {
      setResponses([]);
      setContext({});
    }
  }, [currentChat]);

  const handleFileSelect = file => {
    setUploadedFile(file);
    setInputText(`Analyzing file: ${file.name}`);
  };

  const handleSend = useCallback(async (overrideText, editIndex) => {
    const textToSend = overrideText || inputText;
    if (textToSend.trim() === "" && !uploadedFile) return;

    if (!chatActive) {
      onChatStart(textToSend);
    }

    setIsLoading(true);
    const newUserResponse = { type: "user", text: textToSend };

    let updatedResponses;
    if (editIndex !== undefined) {
      updatedResponses = responses.slice(0, editIndex + 1);
      updatedResponses[editIndex] = newUserResponse;
    } else {
      updatedResponses = [...responses, newUserResponse];
    }
    setResponses(updatedResponses);

    setInputText("");

    const updatedContext = { ...context };
    if (editIndex !== undefined) {
      Object.keys(updatedContext).forEach(key => {
        if (parseInt(key) > editIndex) {
          delete updatedContext[key];
        }
      });
    }
    updatedContext[updatedResponses.length - 1] = newUserResponse;

    let responseGenerator;
    try {
      if (uploadedFile) {
        const fileContent = await readFileContent(uploadedFile);
        responseGenerator = processFileContent(fileContent, selectedModel);
      } else {
        responseGenerator = getChatResponse(textToSend, selectedModel);
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

      updatedContext[updatedResponses.length] = { ...newAIResponse, text: fullContent };
      setContext(updatedContext);

      const updatedChat = currentChat
        ? {
            ...currentChat,
            messages: [
              ...updatedResponses,
              { ...newAIResponse, text: fullContent },
            ],
            timestamp: Date.now(),
          }
        : {
            id: Date.now(),
            title: textToSend,
            timestamp: Date.now(),
            messages: [
              newUserResponse,
              { ...newAIResponse, text: fullContent },
            ],
          };
      await saveChatHistory(updatedChat);

      onUpdateChatHistory(updatedChat);
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
    currentChat,
  ]);

  const handleEditPrompt = (index, oldText) => {
    const newText = prompt("Edit your prompt:", oldText);
    if (newText && newText !== oldText) {
      handleSavePrompt(index, newText);
    }
  };

  const handleSavePrompt = async (index, newText) => {
    const updatedResponses = responses.slice(0, index + 1).map((response, i) =>
      i === index ? { ...response, text: newText } : response
    );
    setResponses(updatedResponses);
    setContext(prevContext => {
      const newContext = { ...prevContext };
      Object.keys(newContext).forEach(key => {
        if (parseInt(key) > index) {
          delete newContext[key];
        }
      });
      return newContext;
    });

    // Generate new response
    await handleSend(newText, index);
  };

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
      case "mixtral-7b-instruct":
        return perplexityResponse(content, contextMessages);
      case "perplexity":
        return perplexitySearch(content);
      case "exa":
        return exaSearch(content);
      default:
        throw new Error("Unsupported model selected");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full max-w-3xl mx-auto my-6 sm:my-8 md:my-12'>
      <ChatContainer
        responses={responses}
        onEditPrompt={handleEditPrompt}
        onSavePrompt={handleSavePrompt}
      />
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
