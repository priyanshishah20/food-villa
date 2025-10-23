import React from 'react';

const Carousel = ({ cards }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
      {cards.map((card, idx) => (
        <div key={idx} style={{ background: '#eee', padding: '20px', borderRadius: '8px' }}>
          <h3>{card.offer || card.offerName}</h3>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
