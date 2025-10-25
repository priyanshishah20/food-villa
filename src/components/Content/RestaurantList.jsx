import React, { useEffect, useState } from 'react';
import { SkeletonRestCard } from './SkeletonEffect.jsx';
import { FaStar } from "react-icons/fa";
import { ratings } from '../../utils/ratings.js';


const RestaurantList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const data = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2799611&lng=72.862751&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
      );
      const json = await data.json();
      console.log(json);

      // ✅ Find the card that actually contains restaurant data
      const cards = json?.data?.cards || [];
      const restaurantCard = cards.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const list =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      // Extract restaurant info
      const restaurantInfo = list.map((r) => r.info);

      setRestaurants(restaurantInfo);
      setFilteredRestaurants(restaurantInfo);
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
    }
  }

  const handleSearch = () => {
    const query = searchInput.toLowerCase();

    if (!query) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filtered = restaurants.filter((res) => {
      const nameMatch = res.name?.toLowerCase().includes(query);
      const cuisineMatch = res.cuisines?.join(' ').toLowerCase().includes(query);
      return nameMatch || cuisineMatch;
    });

    setFilteredRestaurants(filtered);
  };

  return (
    <div>
      <div className="search-container" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for restaurants or cuisines..."
          className='text-sm py-2 px-3 mr-3 rounded-md border border-gray-300 focus:outline-none w-64'
        />
        <button onClick={handleSearch} className='text-sm py-2 px-3 inline-block bg-[#333] text-white rounded-md'>Search</button>
      </div>

      {restaurants.length === 0 ? ( //restaurants.length === 0 ?
        <SkeletonRestCard />
      ) : filteredRestaurants.length === 0 ? (
        <h4>No restaurants match your filter</h4>
      ) : (
        <div className='grid grid-cols-3 gap-6'>
          {filteredRestaurants.map((res) => (
            <div key={res.id}
              className='border border-transparent hover:border-gray-100 p-3 rounded-xl space-y-1 
              hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]'
            >
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${res.cloudinaryImageId}`}
                alt={res.name} className='rounded-xl h-[250px] w-full mb-3' 
              />
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold'>{res.name}</h3>
                <div className={`flex items-center ${ratings(res.avgRating)} rounded-sm text-white py-0.5 px-1`}>
                  <p className='text-xs font-semibold pr-1'>{res.avgRating}</p> <FaStar size={10} />
                </div>
              </div>
              <div className='flex items-center justify-between text-[13px] text-gray-500'>
                <p>{res.cuisines?.join(', ')}</p>
                <p>{res.costForTwo}</p>
              </div>
              <div className='flex items-center justify-between text-gray-400 font-normal'>
                <p className='text-[13px]'>{res.areaName}</p>
                <p className='text-[12px] text-gray-600 font-semibold'>{res.sla.lastMileTravelString}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
