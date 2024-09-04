import React from "react";

const Dialog = ({ onClose, children }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-auto h-[80vh]'>
      <div className='p-4 h-full flex flex-col'>
        <button
          className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 self-end text-2xl sm:text-3xl'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='flex-grow overflow-hidden'>{children}</div>
      </div>
    </div>
  </div>
);

export default Dialog;
