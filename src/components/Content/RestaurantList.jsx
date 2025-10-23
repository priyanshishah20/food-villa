import React, { useEffect, useState } from 'react';
import { SkeletonRestCard } from './SkeletonEffect.jsx';

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
    <div style={{ padding: '20px' }}>
      <div className="search-container" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for restaurants or cuisines..."
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '250px',
            marginRight: '10px',
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {restaurants.length === 0 ? ( //restaurants.length === 0 ?
        <SkeletonRestCard />
      ) : filteredRestaurants.length === 0 ? (
        <h4>No restaurants match your filter</h4>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filteredRestaurants.map((res) => (
            <div key={res.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
              // onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              // onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${res.cloudinaryImageId}`}
                alt={res.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}  
              />
              <h3>{res.name}</h3>
              <p>{res.cuisines?.join(', ')}</p>
              <h4>{res.avgRating} ⭐</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
