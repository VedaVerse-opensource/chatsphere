"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ApiKeyDialog from "@/components/ApiKeyDialog";
import {
  getChatHistory,
  saveChatHistory,
  deleteChatHistory,
  updateChatHistory,
  savePrompt,
  getSavedPrompts
} from "@/utils/indexedDB";

const Home = () => {
  const [selectedModel, setSelectedModel] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedModel") || "Select Model";
    }
    return "Select Model";
  });
  const [mode, setMode] = useState("chatbot");
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState([]);

  const fetchedRef = useRef(false);
  const initialFetchDone = useRef(false);
  const promptRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || initialFetchDone.current) return;

    const fetchData = async () => {
      if (fetchedRef.current) return;
      console.log("fetchData called");
      try {
        fetchedRef.current = true;
        const history = await getChatHistory();
        const sortedHistory = history.sort((a, b) => b.timestamp - a.timestamp);
        setChatHistory(sortedHistory);

        const prompts = await getSavedPrompts();
        setSavedPrompts(prompts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    initialFetchDone.current = true;

    return () => {
      fetchedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleModelChange = model => {
    setSelectedModel(model);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedModel", model);
    }
  };

  const handleModeChange = newMode => {
    setMode(newMode);
    if (newMode === "chatbot") {
      setSelectedModel("Select Model");
    } else {
      setSelectedModel("Select Search Engine");
    }
  };

  const handleChatStart = async title => {
    console.log("handleChatStart called");
    setIsChatActive(true);
    const newChat = {
      id: Date.now(),
      title,
      timestamp: Date.now(),
      messages: [],
    };
    setChatHistory(prevHistory => [newChat, ...prevHistory]);
    await saveChatHistory(newChat);
    console.log("newChat saved");
  };
  
  const handleNewChat = () => {
    setIsChatActive(false);
    setCurrentChat(null);
  };

  const handleChatSelect = selectedChat => {
    setCurrentChat(selectedChat);
    setIsChatActive(true);
    setIsSidebarOpen(false);
  };

  const handleUpdateChatHistory = updatedChat => {
    setChatHistory(prevHistory => {
      const newHistory = prevHistory.filter(chat => chat.id !== updatedChat.id);
      return [updatedChat, ...newHistory].sort(
        (a, b) => b.timestamp - a.timestamp,
      );
    });
    setCurrentChat(updatedChat);
  };

  const handleDeleteChat = async id => {
    await deleteChatHistory(id); // Call the delete function from IndexedDB
    setChatHistory(prevHistory => prevHistory.filter(chat => chat.id !== id)); // Update local state
  };

  const handleToggleFavorite = async (chatId) => {
    const updatedHistory = chatHistory.map(chat => 
      chat.id === chatId ? { ...chat, isFavorite: !chat.isFavorite } : chat
    );
    setChatHistory(updatedHistory);
    const chatToUpdate = updatedHistory.find(chat => chat.id === chatId);
    await updateChatHistory(chatId, chatToUpdate);
  };

  const favoritedChats = chatHistory.filter(chat => chat.isFavorite);

  const handleSavePrompt = async (prompt) => {
    if (!savedPrompts.includes(prompt)) {
      await savePrompt(prompt);
      setSavedPrompts((prevPrompts) => [...prevPrompts, prompt]);
    }
  };

  const handleSelectPrompt = (prompt) => {
    if (promptRef.current) {
      promptRef.current.setInputText(prompt);
    }
  };

  if (!isMounted) {
    return null; // or a loading indicator
  }

  return (
    <div className='flex-grow container px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col'>
      <Navbar
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        mode={mode}
        onModeChange={handleModeChange}
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        onOpenApiKeyDialog={() => setIsApiKeyDialogOpen(true)}
        handleChatSelect={handleChatSelect}
        isApiKeyDialogOpen={isApiKeyDialogOpen}
        setIsApiKeyDialogOpen={setIsApiKeyDialogOpen}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        chatHistory={chatHistory}
        onChatSelect={handleChatSelect}
        onDeleteChat={handleDeleteChat}
        onToggleFavorite={handleToggleFavorite}
      />
      <ApiKeyDialog
        isOpen={isApiKeyDialogOpen}
        onClose={() => setIsApiKeyDialogOpen(false)}
        favoritedChats={favoritedChats}
        onChatSelect={handleChatSelect}
        savedPrompts={savedPrompts}
        onSelectPrompt={handleSelectPrompt}
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
          ref={promptRef}
          selectedModel={selectedModel}
          chatActive={isChatActive}
          onChatStart={handleChatStart}
          currentChat={currentChat}
          onUpdateChatHistory={handleUpdateChatHistory}
          savedPrompts={savedPrompts}
          onSavePrompt={handleSavePrompt}
          onSelectPrompt={handleSelectPrompt}
        />
      </div>
    </div>
  );
};


export default Home;
