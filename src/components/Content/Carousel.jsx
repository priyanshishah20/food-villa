import React from 'react';

const Carousel = ({ cards }) => {
  return (
    <div className='flex gap-3 overflow-auto py-4 mb-3'>
      {cards.map((card, idx) => (
        <div key={idx} className='bg-[#eee] p-5 rounded-md'>
          <h3>{card.offer || card.offerName}</h3>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
