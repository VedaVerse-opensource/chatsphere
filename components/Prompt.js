"use client";
import React, { useState } from "react";
import groqResponse from "../scripts/groq";

const Mic = () => (
  <svg
    className="w-6 h-6 text-secondary dark:text-quaternary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
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
    stroke="currentColor">
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
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const Prompt = () => {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleSend = async () => {
    const content = await groqResponse(inputText);
    setApiResponse(content);
    setInputText("");
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
            />
            <button className="ml-4 hover:text-primary transition-colors">
              <Attach />
            </button>
          </div>
        </div>
        <button
          className="bg-primary hover:bg-primary/80 text-quaternary rounded-xl p-4 transition-colors"
          onClick={handleSend}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Prompt;
