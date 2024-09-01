import React, { useRef, useEffect } from "react";
import Image from "next/image";

const ChatInput = ({ inputText, setInputText, handleSend }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  return (
    <div className='py-4 px-2 w-[60%] fixed bottom-0 flex items-center'>
      <div className='flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-full'>
        <div className='flex items-center px-4 py-2'>
          {/* <button className="mr-2">
            <Image src="/icons/mic.svg" alt="Mic" width={24} height={24} />
          </button> */}
          <textarea
            ref={textareaRef}
            className='flex-grow bg-transparent focus:outline-none rounded-full pl-5 text-gray-800 dark:text-gray-200 text-sm placeholder-gray-400 resize-none overflow-hidden py-2'
            placeholder='Explore with ChatSphere'
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={1}
            style={{
              minHeight: "2.5rem",
              maxHeight: "8rem",
            }}
          />
          <button className='ml-2'>
            <Image src='/icons/attach.svg' alt='Mic' width={24} height={24} />
          </button>
        </div>
      </div>
      <button
        className='bg-primary hover:bg-primary/80 text-white rounded-full p-3 transition-colors ml-2'
        onClick={handleSend}
      >
        <Image src='/icons/send.svg' alt='Mic' width={24} height={24} />
      </button>
    </div>
  );
};

export default ChatInput;
