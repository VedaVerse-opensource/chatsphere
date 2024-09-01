"use client";
import React, { useState } from "react";
import Image from "next/image";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [selectedModel, setSelectedModel] = useState("Groq - Llama 70b");
  const [isChatActive, setIsChatActive] = useState(false);

  return (
    <div className='flex-grow container px-4 flex flex-col'>
      <Navbar selectedModel={selectedModel} onModelChange={setSelectedModel} />
      {!isChatActive && (
        <>
          <div className='flex items-center justify-center mt-8'>
            <Image
              src='/icons/logo.svg'
              alt='ChatSphere logo'
              width='100'
              height='100'
              className='mr-6'
            />
            <h1 className='text-6xl sm:text-5xl md:text-6xl font-bold text-primary'>
              ChatSphere
            </h1>
          </div>
          <div className='flex-grow flex flex-col justify-center items-center mt-12'>
            <Cards />
          </div>
        </>
      )}
      <div className='w-full h-full px-2 sm:px-4 md:px-8 lg:px-16'>
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
