import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";

const ApiKeyDialog = ({ isOpen, onClose }) => {
  const [groqKey, setGroqKey] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");
  const [activeSection, setActiveSection] = useState("setApiKeys");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGroqKey = localStorage.getItem("groqApiKey");
      const storedOpenAiKey = localStorage.getItem("openAiApiKey");
      const storedGeminiKey = localStorage.getItem("geminiApiKey");
      const storedClaudeKey = localStorage.getItem("claudeApiKey");

      if (storedGroqKey) setGroqKey(storedGroqKey);
      if (storedOpenAiKey) setOpenAiKey(storedOpenAiKey);
      if (storedGeminiKey) setGeminiKey(storedGeminiKey);
      if (storedClaudeKey) setClaudeKey(storedClaudeKey);
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openAiApiKey", openAiKey);
      localStorage.setItem("geminiApiKey", geminiKey);
      localStorage.setItem("groqApiKey", groqKey);
      localStorage.setItem("claudeKey", claudeKey);
    }
    onClose();
  };

  const renderSectionContent = () => {
    if (activeSection === "setApiKeys") {
      return (
        <div className='p-8 h-full overflow-y-auto'>
          <h2 className='text-2xl font-semibold mb-6 whitespace-nowrap text-primary'>
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
          ].map(({ label, value, onChange }) => (
            <div key={label} className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                {label}
              </label>
              <input
                type='text'
                value={value}
                onChange={e => onChange(e.target.value)}
                className='w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white'
                placeholder={`Enter your ${label}`}
              />
            </div>
          ))}
          <button
            className='mt-4 bg-primary text-white px-6 py-3 rounded-md text-lg hover:bg-opacity-90 transition-colors'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      );
    }
    if (activeSection === "howToUse") {
      return (
        <div className='p-8 h-full overflow-y-auto'>
          <h2 className='text-2xl font-semibold mb-6 whitespace-nowrap text-primary'>
            Usage Instructions
          </h2>
          <p className='text-md text-gray-700 dark:text-gray-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi
            voluptate dolorum maxime eligendi. Hic libero blanditiis aut culpa
            tempora non voluptate repellat illum voluptates explicabo eum
            consequuntur, debitis itaque, repellendus, nulla eveniet
            reprehenderit eaque? Suscipit architecto nam, dolor odio eaque magni
            odit dolore maxime, quas aperiam commodi, alias laborum?
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <div className='flex flex-row h-full'>
        <div className='w-1/4 bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto flex flex-col'>
          {[
            { id: "setApiKeys", label: "Set API Keys" },
            { id: "howToUse", label: "How to Use?" },
          ].map(({ id, label }) => (
            <button
              key={id}
              className={`w-full text-left mb-4 p-3 rounded-md text-lg transition-colors ${
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

        <div className='w-3/4 overflow-hidden'>{renderSectionContent()}</div>
      </div>
    </Dialog>
  );
};

export default ApiKeyDialog;
