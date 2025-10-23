import React, { useEffect, useState } from 'react';

const RestaurantList = ({ cards }) => {
  const [searchInput, setSearchInput] = useState('');
  const [restaurant, setRestaurant] = useState(cards);

  const handleSearch = (searchInput, restaurant) => {
    console.log("Searching for:", searchInput);
    const filteredCards = restaurant.filter(card => 
      card.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log("Filtered Results:", filteredCards);
    // setRestaurant(filteredCards);
    return filteredCards;
  }

  useEffect(() => {
    // API call
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try{
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2799611&lng=72.862751&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      console.log(json);
      // setRestaurant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    } catch(error){
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
    <div className="search-container">
      <input
        type="text" value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}
        placeholder="Search for restaurants or cuisines..."
        style={{ padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button onClick={()=> {
        //filter the data based on search input
        const results = handleSearch(searchInput, restaurant);
        //update the restaurant state with the filtered data
        setRestaurant(results);
      }}>Search</button>

    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {restaurant.map((res, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
          <h3>{res.name}</h3>
          <p>{res.cuisine.join(', ')}</p>
          <h4>{res.rating}⭐</h4>
        </div>
      ))}
    </div>
    </>
  );
};

export default RestaurantList;
