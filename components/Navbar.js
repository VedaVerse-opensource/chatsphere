import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import DropdownComponent from "./Dropdown";
import {
  IoMenu,
  IoDocumentTextOutline,
  IoShareOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoStarOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import newchatImage from "../../assets/images/file.svg";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Groq - Llama 70b");
  const router = useRouter();

  const data = [
    { label: "Groq - Llama 70b", value: "groq" },
    { label: "ChatGPT-3.5", value: "gpt-3.5-turbo" },
    { label: "ChatGPT-4", value: "gpt-4" },
    { label: "ChatGPT-4-32k", value: "gpt-4-32k" },
    { label: "DALL·E", value: "dalle" },
    { label: "Gemini", value: "gemini" },
  ];

  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  return (
    <div className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className='left-section'>
        <button className='icon-button' onClick={() => router.push("/")}>
          <IoMenu size={24} color={isDarkMode ? "white" : "black"} />
        </button>
        <Image src={newchatImage} alt='New Chat' width={24} height={24} />
        <DropdownComponent
          data={data}
          placeholder={selectedModel}
          onSelect={handleModelChange}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className='right-section'>
        <button className='icon-button'>
          <IoDocumentTextOutline
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </button>
        <button className='icon-button'>
          <IoShareOutline size={24} color={isDarkMode ? "white" : "black"} />
        </button>
        <button
          className='icon-button'
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <IoSunnyOutline size={24} color='white' />
          ) : (
            <IoMoonOutline size={24} color='black' />
          )}
        </button>
        <button className='icon-button'>
          <IoStarOutline size={24} color={isDarkMode ? "white" : "black"} />
        </button>
        <button className='icon-button'>
          <IoPersonCircleOutline
            size={40}
            color={isDarkMode ? "white" : "#989cff"}
          />
        </button>
      </div>

      <style jsx>{``}</style>
    </div>
  );
};

export default Navbar;
