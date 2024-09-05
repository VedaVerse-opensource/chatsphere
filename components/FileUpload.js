import React from "react";
import { IoAttachOutline } from "react-icons/io5";

const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className='relative'>
      <input
        type='file'
        onChange={handleFileChange}
        className='hidden'
        id='file-upload'
        accept='.txt,.pdf,.doc,.docx'
      />
      <label
        htmlFor='file-upload'
        className='cursor-pointer text-secondary hover:text-primary dark:text-quaternary dark:hover:text-primary transition-colors'
      >
        <IoAttachOutline size={20} className='sm:w-5 sm:h-5 md:w-6 md:h-6' />
      </label>
    </div>
  );
};

export default FileUpload;
