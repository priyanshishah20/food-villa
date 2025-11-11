import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
    const params = useParams();
    console.log(params);

    useEffect(() => {
        //api call
        fetchMenu();
    }, []);

    async function fetchMenu() {
        try {
            const id = params.id;
            const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.2799611&lng=72.862751&restaurantId=58258`);
            const json = await data.json();
            console.log(json);
        } catch (err) {
            console.error('Failed to fetch menu:', err);
        }
    }
    return (
        <>
            <div className='pt-[5.375rem] px-[4.5rem]'>
                {/* <button onClick={()=> fetchMenu()} className="bg-gray-200 py-1 px-2 rounded-md">Show Id</button> */}
                <p>Restaurant Menu id: {params.id}</p>
            </div>
        </>
    )
}

export default RestaurantMenu; 