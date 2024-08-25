import React, { useState } from "react";
import Image from "next/image";
import groqResponse from "../scripts/groq"; // Ensure this path is correct

// Replace Mic, Attach, and Send SVGs with React components or SVG files

const Mic = () => (
  <svg width={25} height={25} viewBox='0 0 25 25' fill='none'>
    <path
      d='M19.7916 10.4167V12.5C19.7916 14.4339 19.0234 16.2885 17.656 17.656C16.2885 19.0234 14.4338 19.7917 12.5 19.7917M12.5 19.7917C10.5661 19.7917 8.71145 19.0234 7.34399 17.656C5.97654 16.2885 5.20831 14.4339 5.20831 12.5V10.4167M12.5 19.7917V23.9583M8.33331 23.9583H16.6666M12.5 1.04167C11.6712 1.04167 10.8763 1.37091 10.2903 1.95696C9.70422 2.54301 9.37498 3.33787 9.37498 4.16667V12.5C9.37498 13.3288 9.70422 14.1237 10.2903 14.7097C10.8763 15.2958 11.6712 15.625 12.5 15.625C13.3288 15.625 14.1236 15.2958 14.7097 14.7097C15.2957 14.1237 15.625 13.3288 15.625 12.5V4.16667C15.625 3.33787 15.2957 2.54301 14.7097 1.95696C14.1236 1.37091 13.3288 1.04167 12.5 1.04167Z'
      stroke='#1E1E1E'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Attach = () => (
  <svg width={25} height={25} viewBox='0 0 25 25' fill='none'>
    <path
      d='M11.9792 22.9167C10.3819 22.9167 9.02778 22.3611 7.91667 21.25C6.80556 20.1389 6.25 18.7847 6.25 17.1875V6.25C6.25 5.10417 6.65799 4.12326 7.47396 3.30729C8.28993 2.49132 9.27083 2.08333 10.4167 2.08333C11.5625 2.08333 12.5434 2.49132 13.3594 3.30729C14.1753 4.12326 14.5833 5.10417 14.5833 6.25V16.1458C14.5833 16.875 14.3316 17.4913 13.8281 17.9948C13.3247 18.4983 12.7083 18.75 11.9792 18.75C11.25 18.75 10.6337 18.4983 10.1302 17.9948C9.62674 17.4913 9.375 16.875 9.375 16.1458V6.25H10.9375V16.1458C10.9375 16.441 11.0373 16.6884 11.237 16.888C11.4366 17.0877 11.684 17.1875 11.9792 17.1875C12.2743 17.1875 12.5217 17.0877 12.7214 16.888C12.921 16.6884 13.0208 16.441 13.0208 16.1458V6.25C13.0208 5.52083 12.7691 4.90451 12.2656 4.40104C11.7622 3.89757 11.1458 3.64583 10.4167 3.64583C9.6875 3.64583 9.07118 3.89757 8.56771 4.40104C8.06424 4.90451 7.8125 5.52083 7.8125 6.25V17.1875C7.8125 18.3333 8.22049 19.3142 9.03646 20.1302C9.85243 20.9462 10.8333 21.3542 11.9792 21.3542C13.125 21.3542 14.1059 20.9462 14.9219 20.1302C15.7378 19.3142 16.1458 18.3333 16.1458 17.1875V6.25H17.7083V17.1875C17.7083 18.7847 17.1528 20.1389 16.0417 21.25C14.9306 22.3611 13.5764 22.9167 11.9792 22.9167Z'
      fill='#1D1B20'
    />
  </svg>
);

const Send = () => (
  <svg width={30} height={30} viewBox='0 0 30 30' fill='none'>
    <path
      d='M27.5 2.5L13.75 16.25M27.5 2.5L18.75 27.5L13.75 16.25M27.5 2.5L2.5 11.25L13.75 16.25'
      stroke='#F5F5F5'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Prompt = () => {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleSend = async () => {
    const content = await groqResponse(inputText);
    setApiResponse(content);
    setInputText("");
  };

  return (
    <div className='prompt-container'>
      {apiResponse && <p className='response-text'>{apiResponse}</p>}
      <div className='prompt'>
        <div className='prompt-box'>
          <Mic />
          <input
            className='input'
            placeholder='Explore with ChatSphere'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Attach />
        </div>
        <button className='send-button' onClick={handleSend}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Prompt;
