import React from "react";

const cardsData = [
  "ChatSphere is an open source project built by the students of VedaVerse",
  "Chats are stored right in your browser, providing complete privacy",
  "Save money by using your own api keys and you dont need to have any subscription",
  "Visit GitHub and start Contributing!",
];

const Cards = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 w-[70%]'>
      {cardsData.map((text, index) => (
        <div
          key={index}
          className='bg-quaternary dark:bg-secondary rounded-2xl w-[90%] border border-red-200 p-6 hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer flex justify-center items-center'
        >
          <p className='text-secondary text-sm dark:text-quaternary'>{text}</p>
        </div>
      ))}
    </div>
  );
};
export default Cards;
