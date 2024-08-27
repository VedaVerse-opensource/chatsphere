"use client";

import React, { useState } from "react";
import Image from "next/image";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import DropdownComponent from "@/components/Dropdown";

const Home = () => {
  const [selectedModel, setSelectedModel] = useState("Groq - Llama 70b");
  const [isChatActive, setIsChatActive] = useState(false);

  const data = [
    { label: "Groq - Llama 70b", value: "groq" },
    { label: "GPT-4o", value: "gpt-4o" },
    { label: "ChatGPT-4", value: "gpt-4" },
    { label: "GPT-4o mini", value: "gpt-4o-mini" },
    { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
    { label: "DALL·E", value: "dalle" },
    { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
    { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
    { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" },
  ];

  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  return (
    <div className="flex-grow container mx-auto px-4 flex flex-col">
      {!isChatActive && (
        <>
          <div className="flex items-center justify-center mt-8">
            <Image
              src="/icons/logo.svg"
              alt="ChatSphere logo"
              width="100"
              height="100"
              className="mr-6"
            />
            <h1 className="text-6xl sm:text-5xl md:text-6xl font-bold text-primary">
              ChatSphere
            </h1>
          </div>
          <div className="flex-grow flex flex-col justify-center items-center mt-12">
            <Cards />
          </div>
        </>
      )}
      <div className="w-full h-full px-2 sm:px-4 md:px-8 lg:px-16">
        <div className="hidden sm:block w-56 lg:w-64">
          <DropdownComponent
            data={data}
            placeholder={selectedModel}
            onSelect={handleModelChange}
          />
        </div>
        <Prompt
          selectedModel={selectedModel}
          chatActive={isChatActive}
          onChatStart={() => setIsChatActive(true)}
        />
      </div>
    </div>
  );
};

export default Home;