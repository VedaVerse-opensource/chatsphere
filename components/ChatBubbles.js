export const UserBubble = ({ text }) => (
  <div className="flex justify-end w-full mb-4">
    <div className="bg-white text-black rounded-2xl py-3 px-4 max-w-[80%] ">
      <p className="text-md leading-relaxed">{text}</p>
    </div>
  </div>
);

export const AIBubble = ({ text }) => (
  <div className="flex justify-start w-full mb-4">
    <div className="bg-[#dddddd] dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl py-3 px-4 max-w-[80%] border">
      <pre className="text-md whitespace-pre-wrap font-sans leading-relaxed">
        {text}
      </pre>
    </div>
  </div>
);
