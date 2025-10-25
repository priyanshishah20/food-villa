import React from 'react';
import { config } from './data/data';
import Carousel from './Carousel';
import RestaurantList from './RestaurantList';

const ConfigRenderer = () => {
  return (
    <div className='pt-[4.375rem] px-[4.5rem]'>
      {config.map((section, idx) => {
        switch (section.type) {
          case "carousel":
            return <Carousel key={idx} cards={section.cards} />;
          case "restaurantList":
            return <RestaurantList key={idx} cards={section.cards} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ConfigRenderer;
