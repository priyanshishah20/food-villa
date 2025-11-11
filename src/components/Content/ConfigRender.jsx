import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './data/data';
import Carousel from './Carousel';
import RestaurantList from './RestaurantList';

const ConfigRenderer = () => {
  return (
    <div className='pt-[5.375rem] px-[4.5rem]'>
      {config.map((section, idx) => {
        switch (section.type) {
          // case "carousel":
            // return <Carousel key={idx} cards={section.cards} />;
          case "restaurantList":
            return (<Link to={`/restaurant/${section.id}`} key={idx}><RestaurantList cards={section.cards} /></Link>);
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ConfigRenderer;
