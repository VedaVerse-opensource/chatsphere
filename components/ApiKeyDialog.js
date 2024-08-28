import React, { useState } from "react";
import Dialog from "./Dialog";

const ApiKeyDialog = ({ isOpen, onClose }) => {
  const [groqKey, setGroqKey] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");

  const handleSave = () => {
    // Save the keys to localStorage
    localStorage.setItem("groqApiKey", groqKey);
    localStorage.setItem("openAiApiKey", openAiKey);
    localStorage.setItem("geminiApiKey", geminiKey);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-6'>Set API Keys</h2>

        <div className='mb-4 flex items-center'>
          <label className='w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200'>
            Groq API Key
          </label>
          <input
            type='text'
            value={groqKey}
            onChange={e => setGroqKey(e.target.value)}
            className='flex-grow p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black'
            placeholder='Enter your Groq API key'
          />
          <button
            className='ml-4 bg-primary text-white px-4 py-2 rounded-md'
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        <div className='mb-4 flex items-center'>
          <label className='w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200'>
            OpenAI API Key
          </label>
          <input
            type='text'
            value={openAiKey}
            onChange={e => setOpenAiKey(e.target.value)}
            className='flex-grow p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black'
            placeholder='Enter your OpenAI API key'
          />
          <button
            className='ml-4 bg-primary text-white px-4 py-2 rounded-md'
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        <div className='mb-4 flex items-center'>
          <label className='w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200'>
            Gemini API Key
          </label>
          <input
            type='text'
            value={geminiKey}
            onChange={e => setGeminiKey(e.target.value)}
            className='flex-grow p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black'
            placeholder='Enter your Gemini API key'
          />
          <button
            className='ml-4 bg-primary text-white px-4 py-2 rounded-md'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ApiKeyDialog;
