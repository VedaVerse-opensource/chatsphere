"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropdownComponent from "./Dropdown";
import ApiKeyDialog from "./ApiKeyDialog";
import {
  IoMenu,
  IoDocumentTextOutline,
  IoShareOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoStarOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

const Navbar = ({ selectedModel, onModelChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const data = [
    {
      label: "Groq",
      options: [{ label: "Llama 70b", value: "groqApiKey", name: "llama70b" }],
    },
    {
      label: "Claude",
      options: [{ label: "3.5 Sonnet", value: "claudeKey", name: "3.5sonnet" }],
    },
    {
      label: "OpenAI",
      options: [
        { label: "GPT-4o", value: "openAiApiKey", name: "gpt-4o" },
        { label: "GPT-4", value: "openAiApiKey", name: "gpt-4" },
        { label: "GPT-4o mini", value: "openAiApiKey", name: "gpt-4o-mini" },
        {
          label: "GPT-3.5 Turbo",
          value: "openAiApiKey",
          name: "gpt-3.5-turbo",
        },
      ],
    },
    {
      label: "Gemini",
      options: [
        {
          label: "Gemini 1.5 Pro",
          value: "gemini-1.5-pro",
          name: "gemini-1.5-pro",
        },
        {
          label: "Gemini 1.5 Flash",
          value: "gemini-1.5-flash",
          name: "gemini-1.5-flash",
        },
        {
          label: "Gemini 1.0 Pro",
          value: "gemini-1.0-pro",
          name: "gemini-1.0-pro",
        },
      ],
    },
  ];

  const handleModelChange = name => {
    onModelChange(name);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAvatarClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <nav
      className={`bg-background-light fixed w-full top-0 dark:bg-background-dark ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className='max-w-7xl mx-auto px-2'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <button
              className='text-primary dark:text-quaternary dark:hover:text-primary transition-colors p-2 rounded-full'
              onClick={() => router.push("/")}
              title='Menu'
            >
              <IoMenu size={24} />
            </button>
            <Image
              src='/icons/file.svg'
              alt='New Chat'
              width={24}
              height={24}
              className='text-secondary dark:text-quaternary'
              title='New Chat'
            />
            <div className='hidden sm:block w-56 lg:w-64'>
              <DropdownComponent
                data={data}
                placeholder={selectedModel}
                onSelect={handleModelChange}
              />
            </div>
          </div>
          <div className='flex items-center space-x-2 sm:space-x-4'>
            <NavButton
              icon={<IoDocumentTextOutline size={20} />}
              title='Saved Prompts'
            />
            <NavButton icon={<IoShareOutline size={20} />} title='Share' />
            <NavButton
              icon={
                isDarkMode ? (
                  <IoSunnyOutline size={20} />
                ) : (
                  <IoMoonOutline size={20} />
                )
              }
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            />
            <NavButton icon={<IoStarOutline size={20} />} title='Favorites' />
            <button
              className='text-primary hover:text-primary/80 transition-colors p-1 rounded-full'
              onClick={handleAvatarClick}
              title='User Profile'
            >
              <IoPersonCircleOutline size={32} />
            </button>
          </div>
        </div>
      </div>

      <ApiKeyDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </nav>
  );
};

const NavButton = ({ icon, onClick, title }) => (
  <button
    className='text-secondary hover:text-primary dark:text-quaternary dark:hover:text-primary transition-colors p-2 rounded-full'
    onClick={onClick}
    title={title}
  >
    {icon}
  </button>
);

export default Navbar;
