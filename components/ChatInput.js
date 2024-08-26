import React, { useRef, useEffect } from "react";
const Mic = () => (
  <svg
    className="w-6 h-6 text-gray-400 hover:text-primary transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const Attach = () => (
  <svg
    className="w-6 h-6 text-gray-400 hover:text-primary transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const Send = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const ChatInput = ({ inputText, setInputText, handleSend }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  return (
    <div className="py-4 px-2 w-[60%] fixed bottom-0 flex items-center">
      <div className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-full">
        <div className="flex items-center px-4 py-2">
          <button className="mr-2">
            <Mic />
          </button>
          <textarea
            ref={textareaRef}
            className="flex-grow bg-transparent focus:outline-none rounded-full pl-5 text-gray-800 dark:text-gray-200 text-sm placeholder-gray-400 resize-none overflow-hidden py-2"
            placeholder="Explore with ChatSphere"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={1}
            style={{
              minHeight: "2.5rem",
              maxHeight: "8rem",
            }}
          />
          <button className="ml-2">
            <Attach />
          </button>
        </div>
      </div>
      <button
        className="bg-primary hover:bg-primary/80 text-white rounded-full p-3 transition-colors ml-2"
        onClick={handleSend}>
        <Send />
      </button>
    </div>
  );
};

export default ChatInput;
