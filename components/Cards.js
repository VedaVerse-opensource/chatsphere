import React from "react";

const cardsData = [
  "Complete my travel blog tagline: explore, discover, and...",
  "Suggest innovative tech gadgets, with key features and drawbacks.",
  "Plan engaging icebreakers for our virtual conference...",
  "Outline a marketing strategy for launching our new app.",
];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 w-full max-w-6xl">
      {cardsData.map((text, index) => (
        <div
          key={index}
          className="bg-quaternary dark:bg-secondary rounded-lg w-[80%] border border-red-200 p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-secondary dark:text-quaternary">{text}</p>
        </div>
      ))}
    </div>
  );
};
export default Cards;
