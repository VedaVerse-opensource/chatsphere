"use client";
import React, { useState } from "react";
import groqResponse from "../scripts/groq";
import {
  gpt4Response,
  gpt4oResponse,
  gpt4oMiniResponse,
  gpt35TurboResponse,
} from "../scripts/chatgpt";
// import dalleResponse from "../scripts/dalle";
import {
  gemini15ProResponse,
  gemini15FlashResponse,
  gemini10ProResponse,
} from "../scripts/gemini";

const Mic = () => (
  <svg
    className="w-6 h-6 text-secondary dark:text-quaternary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const Attach = () => (
  <svg
    className="w-6 h-6 text-secondary dark:text-quaternary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const Send = () => (
  <svg
    className="w-6 h-6 text-quaternary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const Prompt = ({ selectedModel }) => {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    let content;
    try {
      switch (selectedModel) {
        case "groq":
          content = await groqResponse(inputText);
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
        case "dalle":
          content = await dalleResponse(inputText);
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
      setApiResponse(content);
    } catch (error) {
      console.error("Error fetching response:", error);
      setApiResponse(
        "An error occurred while fetching the response. Please try again."
      );
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      {apiResponse && (
        <div className="bg-tertiary dark:bg-secondary rounded-xl p-6 mb-8">
          <p className="text-secondary dark:text-quaternary text-lg">
            {apiResponse}
          </p>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <div className="flex-grow bg-tertiary dark:bg-secondary rounded-xl">
          <div className="flex items-center p-4">
            <button className="mr-4 hover:text-primary transition-colors">
              <Mic />
            </button>
            <input
              className="flex-grow bg-transparent focus:outline-none text-secondary dark:text-quaternary text-lg placeholder-secondary/60 dark:placeholder-quaternary/60"
              placeholder="Explore with ChatSphere"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button className="ml-4 hover:text-primary transition-colors">
              <Attach />
            </button>
          </div>
        </div>
        <button
          className={`bg-primary hover:bg-primary/80 text-quaternary rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : <Send />}
        </button>
      </div>
    </div>
  );
};

export default Prompt;
