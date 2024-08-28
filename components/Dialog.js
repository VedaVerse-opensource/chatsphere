import React from "react";

const Dialog = ({ onClose, children }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto'>
      <div className='p-4'>
        <button
          className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 float-right text-3xl'
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  </div>
);

export default Dialog;
