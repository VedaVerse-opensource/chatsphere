"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import DropdownComponent from "./Dropdown";
import ApiKeyDialog from "./ApiKeyDialog";
import {
  IoMenu,
  IoShareOutline,
  IoPersonCircleOutline,
  IoLogoGithub,
  IoSearchOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";

const Navbar = ({ selectedModel, onModelChange, mode, onModeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastChatbotModel, setLastChatbotModel] = useState("Select Model");
  const [lastSearchModel, setLastSearchModel] = useState(
    "Select Search Engine",
  );
  const menuRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const groqKeyStored = localStorage.getItem("groqApiKey");
      const openAiKeyStored = localStorage.getItem("openAiApiKey");
      const geminiKeyStored = localStorage.getItem("geminiApiKey");
      const claudeKeyStored = localStorage.getItem("claudeApiKey");

      if (
        groqKeyStored === null &&
        openAiKeyStored === null &&
        geminiKeyStored === null &&
        claudeKeyStored === null
      ) {
        setIsDialogOpen(true);
      }
    }
  }, []);

  const data = [
    {
      label: "Search Engines",
      options: [
        { label: "Perplexity", value: "perplexityApiKey", name: "perplexity" },
        { label: "Exa.ai", value: "exaApiKey", name: "exa" },
      ],
    },
    {
      label: "Groq",
      options: [
        { label: "Llama 70b Versatile", value: "groqApiKey", name: "llama70b" },
      ],
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
    {
      label: "Perplexity",
      options: [
        {
          label: "Mixtral 7B Instruct",
          value: "perplexityApiKey",
          name: "mixtral-7b-instruct",
        },
      ],
    },
  ];

  const handleModelChange = name => {
    onModelChange(name);
    setIsMenuOpen(false);
    if (mode === "chatbot") {
      setLastChatbotModel(name);
    } else {
      setLastSearchModel(name);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMode = () => {
    const newMode = mode === "chatbot" ? "search" : "chatbot";
    onModeChange(newMode);
    if (newMode === "chatbot") {
      onModelChange(lastChatbotModel);
    } else {
      onModelChange(lastSearchModel);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <nav
      className={`bg-background-light fixed w-full top-0 left-0 right-0 dark:bg-background-dark z-50 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14 sm:h-16 md:h-20'>
          <div className='flex items-center space-x-2 sm:space-x-3 md:space-x-4'>
            <button
              className='text-primary dark:text-quaternary dark:hover:text-primary transition-colors p-1 sm:p-2 rounded-full'
              onClick={() => {
                /* Handle hamburger menu click */
              }}
              title='Menu'
            >
              <IoMenu size={24} className='sm:w-6 sm:h-6 md:w-7 md:h-7' />
            </button>
            <Image
              src='/icons/file.svg'
              alt='New Chat'
              width={20}
              height={20}
              className='text-secondary dark:text-quaternary sm:w-5 sm:h-5 md:w-6 md:h-6'
              title='New Chat'
            />
            <div className='hidden sm:block w-56 lg:w-64'>
              <DropdownComponent
                data={data}
                placeholder={
                  mode === "chatbot" ? "Select Model" : "Select Search Engine"
                }
                onSelect={handleModelChange}
                isDarkMode={isDarkMode}
                mode={mode}
              />
            </div>
          </div>
          <div className='flex items-center space-x-1 sm:space-x-2 md:space-x-3'>
            <div className='hidden sm:flex items-center space-x-1 sm:space-x-2 md:space-x-3'>
              <button
                onClick={toggleMode}
                className='text-secondary hover:text-primary dark:text-quaternary dark:hover:text-primary transition-colors p-1 sm:p-1.5 md:p-2 rounded-full flex items-center'
                title={
                  mode === "chatbot"
                    ? "Switch to Search Engine"
                    : "Switch to Chatbot"
                }
              >
                {mode === "chatbot" ? (
                  <>
                    <IoChatbubbleOutline size={20} className='mr-1' />
                    <span>AI ChatBot Mode</span>
                  </>
                ) : (
                  <>
                    <IoSearchOutline size={20} className='mr-1' />
                    <span>AI Search Engine Mode</span>
                  </>
                )}
              </button>
              <NavButtons />
            </div>
            <div className='relative' ref={menuRef}>
              <button
                className='text-primary hover:text-primary/80 transition-colors p-1 rounded-full'
                onClick={toggleMenu}
                title='User Profile'
              >
                <IoPersonCircleOutline size={32} />
              </button>
              {isMenuOpen && (
                <div className='absolute right-0 mt-2 w-64 sm:w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10'>
                  <div className='sm:hidden flex justify-center py-2'>
                    <NavButtons />
                  </div>
                  <div className='sm:hidden px-4 py-2'>
                    <DropdownComponent
                      data={data}
                      placeholder={
                        mode === "chatbot"
                          ? "Select Model"
                          : "Select Search Engine"
                      }
                      onSelect={handleModelChange}
                      isDarkMode={isDarkMode}
                      mode={mode}
                    />
                  </div>
                  <button
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Settings
                  </button>
                  {/* Add more menu items as needed */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ApiKeyDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </nav>
  );
};

const NavButtons = () => (
  <>
    <a
      href='https://github.com/VedaVerse-opensource/chatsphere'
      target='_blank'
      rel='noopener noreferrer'
    >
      <NavButton
        icon={<IoLogoGithub size={20} />}
        title='View ChatSphere on GitHub'
      />
    </a>
    <NavButton icon={<IoShareOutline size={20} />} title='Share' />
  </>
);

const NavButton = ({ icon, onClick, title }) => (
  <button
    className='text-secondary hover:text-primary dark:text-quaternary dark:hover:text-primary transition-colors p-1 sm:p-1.5 md:p-2 rounded-full'
    onClick={onClick}
    title={title}
  >
    {React.cloneElement(icon, {
      size: 20,
      className: "sm:w-5 sm:h-5 md:w-6 md:h-6",
    })}
  </button>
);

export default Navbar;
