import { IoPersonCircleOutline } from "react-icons/io5";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

export const UserBubble = ({ text }) => (
  <div className='flex justify-end w-full mb-3 sm:mb-4'>
    <div className='flex items-end space-x-2 max-w-[85%]'>
      <div className='bg-[#dddddd] dark:bg-dark-surface text-gray-800 dark:text-dark-text rounded-2xl py-2 sm:py-3 px-3 sm:px-4 border dark:border-gray-600 w-full'>
        <p className='text-sm sm:text-md leading-relaxed'>{text}</p>
      </div>
      <div className='flex-shrink-0 mb-1'>
        <IoPersonCircleOutline
          size={24}
          className='text-primary sm:w-6 sm:h-6 md:w-7 md:h-7'
        />
      </div>
    </div>
  </div>
);

export const AIBubble = ({ text }) => (
  <div className='flex justify-start w-full mb-3 sm:mb-4'>
    <div className='flex items-end space-x-2 w-full sm:w-[95%] md:w-[90%] lg:w-[85%]'>
      <div className='flex-shrink-0 mb-1'>
        <Image
          src='/icons/logo.svg'
          alt='AI'
          width={24}
          height={24}
          className='sm:w-6 sm:h-6 md:w-7 md:h-7'
        />
      </div>
      <div className='bg-[#dddddd] dark:bg-dark-surface text-gray-800 dark:text-dark-text rounded-2xl py-2 sm:py-3 px-3 sm:px-4 border dark:border-gray-600 w-full'>
        <ReactMarkdown
          className='text-sm sm:text-md whitespace-pre-wrap font-sans leading-relaxed'
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  </div>
);
