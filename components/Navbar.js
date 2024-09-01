// components/Navbar.js
"use client";
import React, { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false); 
  const router = useRouter();

  const data = [
    { label: "Groq - Llama 70b", value: "groq" },
    { label: "Claude 3.5 - Sonnet", value: "claude" },
    { label: "GPT-4o", value: "gpt-4o" },
    { label: "ChatGPT-4", value: "gpt-4" },
    { label: "GPT-4o mini", value: "gpt-4o-mini" },
    { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
    { label: "DALL·E", value: "dalle" },
    { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
    { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
    { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" },
  ];

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const handleModelChange = value => {
    onModelChange(value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAvatarClick = () => {
    setIsDialogOpen(true);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  if (!mounted) return null;

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
            >
              <IoMenu size={24} />
            </button>
            <Image
              src='/icons/file.svg'
              alt='New Chat'
              width={24}
              height={24}
              className='text-secondary dark:text-quaternary'
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
            <NavButton icon={<IoDocumentTextOutline size={20} />} />
            <NavButton icon={<IoShareOutline size={20} />} />
            <NavButton
              icon={
                isDarkMode ? (
                  <IoSunnyOutline size={20} />
                ) : (
                  <IoMoonOutline size={20} />
                )
              }
              onClick={toggleDarkMode}
            />
            <NavButton icon={<IoStarOutline size={20} />} />
            <button
              className='text-primary hover:text-primary/80 transition-colors p-1 rounded-full'
              onClick={handleAvatarClick}
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

const NavButton = ({ icon, onClick }) => (
  <button
    className='text-secondary hover:text-primary dark:text-quaternary dark:hover:text-primary transition-colors p-2 rounded-full'
    onClick={onClick}
  >
    {icon}
  </button>
);

export default Navbar;
