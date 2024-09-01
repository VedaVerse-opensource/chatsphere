import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";

const ApiKeyDialog = ({ isOpen, onClose }) => {
  const [groqKey, setGroqKey] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");

  useEffect(() => {
    // Check if we're in a browser environment
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

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-6'>Set API Keys</h2>
        {/* Render the input fields for each API key */}
        {[
          { label: "Groq API Key", value: groqKey, onChange: setGroqKey },
          { label: "OpenAI API Key", value: openAiKey, onChange: setOpenAiKey },
          { label: "Gemini API Key", value: geminiKey, onChange: setGeminiKey },
          { label: "Claude API Key", value: claudeKey, onChange: setClaudeKey },
        ].map(({ label, value, onChange }) => (
          <div key={label} className='mb-4 flex items-center'>
            <label className='w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200'>
              {label}
            </label>
            <input
              type='text'
              value={value}
              onChange={e => onChange(e.target.value)}
              className='flex-grow p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-black'
              placeholder={`Enter your ${label}`}
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
