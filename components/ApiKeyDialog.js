import React, { useState, useEffect } from "react";
import Dialog from "./Dialog";

const ApiKeyDialog = ({ isOpen, onClose }) => {
  const [groqKey, setGroqKey] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGroqKey(localStorage.getItem("groqApiKey") || "");
      setOpenAiKey(localStorage.getItem("openAiApiKey") || "");
      setGeminiKey(localStorage.getItem("geminiApiKey") || "");
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openAiApiKey", openAiKey);
      localStorage.setItem("geminiApiKey", geminiKey);
      localStorage.setItem("groqApiKey", groqKey);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-6'>Set API Keys</h2>

        {["Groq", "OpenAI", "Gemini"].map((keyName, index) => (
          <div className='mb-4 flex items-center' key={index}>
            <label className='w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200'>
              {keyName} API Key
            </label>
            <input
              type='text'
              value={
                keyName === "Groq"
                  ? groqKey
                  : keyName === "OpenAI"
                  ? openAiKey
                  : geminiKey
              }
              onChange={e =>
                keyName === "Groq"
                  ? setGroqKey(e.target.value)
                  : keyName === "OpenAI"
                  ? setOpenAiKey(e.target.value)
                  : setGeminiKey(e.target.value)
              }
              className='flex-grow p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black'
              placeholder={`Enter your ${keyName} API key`}
            />
            <button
              className='ml-4 bg-primary text-white px-4 py-2 rounded-md'
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default ApiKeyDialog;
