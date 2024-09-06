"use client";
import React, { useState } from "react";
import Image from "next/image";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [selectedModel, setSelectedModel] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedModel") || "Select Model";
    }
    return "Select Model";
  });
  const [mode, setMode] = useState("chatbot");
  const [isChatActive, setIsChatActive] = useState(false);

  const handleModelChange = model => {
    setSelectedModel(model);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedModel", model);
    }
  };

  const handleModeChange = newMode => {
    setMode(newMode);
    // Reset selectedModel when changing modes
    if (newMode === "chatbot") {
      setSelectedModel("Select Model");
    } else {
      setSelectedModel("Select Search Engine");
    }
  };

  return (
    <div className='flex-grow container px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col'>
      <Navbar
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        mode={mode}
        onModeChange={handleModeChange}
      />
      {!isChatActive && (
        <>
          <div className='flex items-center justify-center mt-4 sm:mt-8 md:mt-12'>
            <Image
              src='/icons/logo.svg'
              alt='ChatSphere logo'
              width='60'
              height='60'
              className='mr-2 sm:mr-4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16'
            />
            <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary'>
              ChatSphere
            </h1>
          </div>
          <div className='flex-grow flex flex-col justify-center items-center mt-4 sm:mt-6 md:mt-8'>
            <Cards />
          </div>
        </>
      )}
      <div className='w-full h-full px-2 sm:px-4 md:px-6 lg:px-8'>
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
