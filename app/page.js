"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [selectedModel, setSelectedModel] = useState("Select Model");
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedModel = localStorage.getItem("selectedModel");
      if (storedModel) {
        setSelectedModel(storedModel);
      }
    }
  }, []);

  const handleModelChange = model => {
    setSelectedModel(model);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedModel", model);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-800'>
      <Navbar selectedModel={selectedModel} onModelChange={handleModelChange} />
      <main className='flex-grow flex flex-col'>
        {!isChatActive ? (
          <div className='flex-grow flex flex-col items-center justify-center px-4'>
            <div className='flex items-center justify-center mb-8'>
              <Image
                src='/icons/logo.svg'
                alt='ChatSphere logo'
                width='60'
                height='60'
                className='mr-4 w-12 h-12 md:w-16 md:h-16'
              />
              <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-primary'>
                ChatSphere
              </h1>
            </div>
            <Cards />
          </div>
        ) : (
          <Prompt
            selectedModel={selectedModel}
            chatActive={isChatActive}
            onChatStart={() => setIsChatActive(true)}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
