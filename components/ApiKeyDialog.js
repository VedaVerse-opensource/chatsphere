import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";
import {
  IoDocumentTextOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoStarOutline,
} from "react-icons/io5";

const ApiKeyDialog = ({ isOpen, onClose }) => {
  const [groqKey, setGroqKey] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");
  const [exaKey, setExaKey] = useState("");
  const [activeSection, setActiveSection] = useState("setApiKeys");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGroqKey = localStorage.getItem("groqApiKey");
      const storedOpenAiKey = localStorage.getItem("openAiApiKey");
      const storedGeminiKey = localStorage.getItem("geminiApiKey");
      const storedClaudeKey = localStorage.getItem("claudeApiKey");
      const storedPerplexityKey = localStorage.getItem("perplexityApiKey");
      const storedExaKey = localStorage.getItem("exaApiKey");

      if (storedGroqKey) setGroqKey(storedGroqKey);
      if (storedOpenAiKey) setOpenAiKey(storedOpenAiKey);
      if (storedGeminiKey) setGeminiKey(storedGeminiKey);
      if (storedClaudeKey) setClaudeKey(storedClaudeKey);
      if (storedPerplexityKey) setPerplexityKey(storedPerplexityKey);
      if (storedExaKey) setExaKey(storedExaKey);

      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openAiApiKey", openAiKey);
      localStorage.setItem("geminiApiKey", geminiKey);
      localStorage.setItem("groqApiKey", groqKey);
      localStorage.setItem("claudeKey", claudeKey);
      localStorage.setItem("perplexityApiKey", perplexityKey);
      localStorage.setItem("exaApiKey", exaKey);
    }
    onClose();
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const renderSectionContent = () => {
    if (activeSection === "setApiKeys") {
      return (
        <div className='space-y-4'>
          <h2 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 whitespace-nowrap text-primary'>
            Set API Keys
          </h2>
          {[
            { label: "Groq API Key", value: groqKey, onChange: setGroqKey },
            {
              label: "OpenAI API Key",
              value: openAiKey,
              onChange: setOpenAiKey,
            },
            {
              label: "Gemini API Key",
              value: geminiKey,
              onChange: setGeminiKey,
            },
            {
              label: "Claude API Key",
              value: claudeKey,
              onChange: setClaudeKey,
            },
            {
              label: "Perplexity API Key",
              value: perplexityKey,
              onChange: setPerplexityKey,
            },
            {
              label: "Exa.ai API Key",
              value: exaKey,
              onChange: setExaKey,
            },
          ].map(({ label, value, onChange }) => (
            <div key={label}>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                {label}
              </label>
              <input
                type='text'
                value={value}
                onChange={e => onChange(e.target.value)}
                className='w-full p-2 sm:p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white text-sm sm:text-base'
                placeholder={`Enter your ${label}`}
              />
            </div>
          ))}
          <div className='pt-4'>
            <button
              className='w-full bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-lg hover:bg-opacity-90 transition-colors'
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      );
    }
    if (activeSection === "settings") {
      return (
        <div className='p-4 sm:p-6 md:p-8 h-full overflow-y-auto'>
          <h2 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 whitespace-nowrap text-primary'>
            Settings
          </h2>
          <div className='space-y-4'>
            <button
              className='flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <IoSunnyOutline size={20} />
              ) : (
                <IoMoonOutline size={20} />
              )}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button className='flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'>
              <IoDocumentTextOutline size={20} />
              <span>Saved Prompts</span>
            </button>
            <button className='flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'>
              <IoStarOutline size={20} />
              <span>Favorites</span>
            </button>
          </div>
        </div>
      );
    }
    if (activeSection === "howToUse") {
      return (
        <div className='p-4 sm:p-6 md:p-8 h-full overflow-y-auto'>
          <h2 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 whitespace-nowrap text-primary'>
            Usage Instructions
          </h2>
          <p className='text-sm sm:text-md text-gray-700 dark:text-gray-300'>
            Updating soon!!
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <div className='flex flex-col h-full'>
        <div className='flex flex-col sm:flex-row flex-grow overflow-hidden'>
          <div className='w-full sm:w-1/4 bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto'>
            <div className='flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2'>
              {[
                { id: "setApiKeys", label: "Set API Keys" },
                { id: "settings", label: "Settings" },
                { id: "howToUse", label: "How to Use?" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  className={`flex-shrink-0 text-center sm:text-left p-2 sm:p-3 rounded-md text-sm sm:text-base transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                    activeSection === id
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveSection(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className='w-full sm:w-3/4 flex flex-col overflow-hidden'>
            <div className='flex-grow overflow-y-auto p-4 sm:p-6 md:p-8'>
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ApiKeyDialog;
