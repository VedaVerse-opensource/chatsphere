import React from "react";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose, chatHistory, onChatSelect }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className='flex justify-between items-center p-4 border-b dark:border-gray-700'>
        <h2 className='text-lg font-semibold text-primary dark:text-white'>
          Chat History
        </h2>
        <button
          onClick={onClose}
          className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        >
          <IoClose size={24} />
        </button>
      </div>
      <div className='overflow-y-auto h-full'>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className='p-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
            onClick={() => onChatSelect(chat)}
          >
            <h3 className='text-sm font-medium text-gray-800 dark:text-gray-200'>
              {chat.title}
            </h3>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {new Date(chat.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
