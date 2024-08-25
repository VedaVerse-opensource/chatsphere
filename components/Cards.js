import React from "react";

const cardsData = [
  "Complete my travel blog tagline: explore, discover, and...",
  "Suggest innovative tech gadgets, with key features and drawbacks",
  "Plan engaging icebreakers for our virtual conference.",
  "Outline a marketing strategy for launching our new app.",
];

const Cards = () => {
  return (
    <div className='container'>
      <div className='row'>
        {cardsData.slice(0, 2).map((text, index) => (
          <div className='card' key={index}>
            <p className='card-text'>{text}</p>
          </div>
        ))}
      </div>
      <div className='row'>
        {cardsData.slice(2, 4).map((text, index) => (
          <div className='card' key={index + 2}>
            <p className='card-text'>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
