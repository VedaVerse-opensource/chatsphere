"use client";
import Image from "next/image";
import { useState } from "react";
// import { useColorScheme } from "@/hooks/useColorScheme";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import DropdownComponent from "@/components/Dropdown";

const Home = () => {
  const [selectedModel, setSelectedModel] = useState("Groq - Llama 70b");
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
    <div className="container px-4 pb-8 flex flex-col justify-start">
      <div className="hidden sm:block w-56 lg:w-64">
        <DropdownComponent
          data={data}
          placeholder={selectedModel}
          onSelect={handleModelChange}
        />
      </div>
      <div className="flex items-center justify-center ">
        <Image
          src="/icons/logo.svg"
          alt="ChatSphere logo"
          width="80"
          height="80"
          className="mr-6"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
          ChatSphere
        </h1>
      </div>
      <Prompt selectedModel={selectedModel} />
      <Cards />
    </div>
  );
};

export default Home;
