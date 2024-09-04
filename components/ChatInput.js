import React, { useRef, useEffect } from "react";
import Image from "next/image";

const ChatInput = ({ inputText, setInputText, handleSend, isLoading }) => {
  const textareaRef = useRef(null);

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

  return (
    <div className='py-2 sm:py-4 px-2 sm:px-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] fixed bottom-0 flex items-center'>
      <div className='flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-full'>
        <div className='flex items-center px-2 sm:px-4 py-1 sm:py-2'>
          <button className='ml-1 sm:ml-2'>
            <Image
              src='/icons/attach.svg'
              alt='Attach'
              width={20}
              height={20}
              className='w-5 h-5 sm:w-6 sm:h-6'
            />
          </button>
          <textarea
            ref={textareaRef}
            className='flex-grow bg-transparent focus:outline-none rounded-full pl-2 sm:pl-4 text-gray-800 dark:text-gray-200 text-xs sm:text-sm placeholder-gray-400 resize-none overflow-hidden py-1 sm:py-2'
            placeholder='Explore with ChatSphere'
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{
              minHeight: "2rem",
              maxHeight: "6rem",
            }}
          />
        </div>
      </div>
      <button
        className={`bg-primary hover:bg-primary/80 text-white rounded-full p-2 sm:p-3 transition-colors ml-2 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSend}
        disabled={isLoading}
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
