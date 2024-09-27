import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import FileUpload from "./FileUpload";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

const ChatInput = ({
  inputText,
  setInputText,
  handleSend,
  isLoading,
  onFileSelect,
  onSavePrompt,
}) => {
  const textareaRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSavePrompt = () => {
    if (inputText.trim()) {
      onSavePrompt(inputText.trim());
      setIsSaved(true);
    }
  };

  return (
    <div className='py-2 sm:py-4 px-2 sm:px-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] fixed bottom-0 flex items-center'>
      <div className='flex-grow bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-full'>
        <div className='flex items-center px-2 sm:px-4 py-1 sm:py-2'>
          <FileUpload onFileSelect={onFileSelect} />
          <textarea
            ref={textareaRef}
            className='flex-grow bg-transparent focus:outline-none rounded-full pl-2 sm:pl-4 text-gray-800 dark:text-dark-text text-xs sm:text-sm placeholder-gray-400 resize-none overflow-hidden py-1 sm:py-2'
            placeholder='Explore with ChatSphere'
            value={inputText}
            onChange={e => {
              setInputText(e.target.value);
              setIsSaved(false);
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{
              minHeight: "2rem",
              maxHeight: "6rem",
            }}
          />
          <button
            className={`text-gray-400 hover:text-primary transition-colors ${
              !inputText.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleSavePrompt();
            }}
            disabled={!inputText.trim()}
          >
            {isSaved ? <IoBookmark size={20} /> : <IoBookmarkOutline size={20} />}
          </button>
        </div>
      </div>
      <button
        className={`bg-primary hover:bg-primary/80 text-white rounded-full p-2 sm:p-3 transition-colors ml-2 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          handleSend();
        }}
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? (
          <div className='w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-white rounded-full animate-spin'></div>
        ) : (
          <Image
            src='/icons/send.svg'
            alt='Send'
            width={20}
            height={20}
            className='w-5 h-5 sm:w-6 sm:h-6'
          />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
