import React from "react";

const cardsData = [
  "ChatSphere is an open source project built by the students of VedaVerse",
  "Chats are stored right in your browser, providing complete privacy",
  "Save money by using your own api keys and you dont need to have any subscription",
  "Visit GitHub and start Contributing!",
];

const Cards = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 sm:mt-8 md:mt-12 w-full max-w-5xl px-4'>
      {cardsData.map((text, index) => (
        <div
          key={index}
          className='bg-quaternary dark:bg-secondary rounded-2xl border border-red-200 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer flex justify-center items-center'
        >
          <p className='text-secondary text-xs sm:text-sm md:text-base dark:text-quaternary'>
            {text}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Cards;
