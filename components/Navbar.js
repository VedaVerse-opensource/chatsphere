"use client";
import React, { useState, useEffect, useRef } from "react";
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
  IoLogoGithub,
  IoClose,
} from "react-icons/io5";

const Navbar = ({ selectedModel, onModelChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

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
  ];

  const handleModelChange = name => {
    onModelChange(name);
    setIsMenuOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <nav
      className={`bg-background-light fixed w-full top-0 dark:bg-background-dark z-50 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className='max-w-7xl mx-auto px-2 sm:px-4 md:px-6'>
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
                placeholder={selectedModel}
                onSelect={handleModelChange}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          <div className='flex items-center space-x-1 sm:space-x-2 md:space-x-3'>
            <div className='hidden sm:flex items-center space-x-1 sm:space-x-2 md:space-x-3'>
              <NavButtons
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
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
                    <NavButtons
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                    />
                  </div>
                  <div className='sm:hidden px-4 py-2'>
                    <DropdownComponent
                      data={data}
                      placeholder={selectedModel}
                      onSelect={handleModelChange}
                      isDarkMode={isDarkMode}
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

const NavButtons = ({ isDarkMode, setIsDarkMode }) => (
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
    <NavButton
      icon={<IoDocumentTextOutline size={20} />}
      title='Saved Prompts'
    />
    <NavButton icon={<IoShareOutline size={20} />} title='Share' />
    <NavButton
      icon={
        isDarkMode ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />
      }
      onClick={() => setIsDarkMode(!isDarkMode)}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    />
    <NavButton icon={<IoStarOutline size={20} />} title='Favorites' />
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
