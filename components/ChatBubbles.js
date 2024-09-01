import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";

export const UserBubble = ({ text }) => (
  <div className='flex justify-end w-full mb-4'>
    <div className='flex items-end space-x-2 max-w-[80%]'>
      <div className='bg-white text-black rounded-2xl py-3 px-4'>
        <p className='text-md leading-relaxed'>{text}</p>
      </div>
      <div className='flex-shrink-0 mb-1'>
        <IoPersonCircleOutline size={30} className='text-primary' />
      </div>
    </div>
  </div>
);

export const AIBubble = ({ text }) => (
  <div className='flex justify-start w-full mb-4'>
    <div className='flex items-end space-x-2 max-w-[80%]'>
      <div className='flex-shrink-0 mb-1'>
        <Image src='/icons/logo.svg' alt='AI' width={30} height={30} />
      </div>
      <div className='bg-[#dddddd] dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl py-3 px-4 border'>
        <pre className='text-md whitespace-pre-wrap font-sans leading-relaxed'>
          {text}
        </pre>
      </div>
    </div>
  </div>
);
