import { useState, useEffect  } from "react";
import { restuarantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom"


function filterData(searchText,restaurants){
    const filterData = restaurants.filter((restaurant) =>
        restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );

    return filterData;
}

const Body = () =>{
    const [allRestaurants, setAllRestuarants] = useState([])
    const [filteredRestuarants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    // if useEffect is empty - then it will called last

    useEffect(() =>{
        getRestaurants();
    }, []);
    
    async function getRestaurants(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4875418&lng=78.3953462&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
        setAllRestuarants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    }

    /*
    if(filteredRestuarants?.length === 0) 
        return <h1>Search result not Found</h1>
    */

    return allRestaurants?.length === 0 ? (
        <div className= "shimmer-ui">
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
        </div>
        ):(
        <>
            <div className="search-container">
                <input 
                    type = "text"
                    className="search-input"
                    placeholder="search"
                    value = {searchText}
                    // setSearchText is a the function
                    onChange = {(e) => {setSearchText(e.target.value);}}
                />
                <button 
                    className="search-btn"
                    onClick={() => {
                        // filter the data
                        const data = filterData(searchText,allRestaurants);
                        // update state of restaurants 
                        setFilteredRestaurants(data);
                    }}
                >
                 search
                </button>
            </div>
            <div className="restuarant-card">
                {filteredRestuarants.map((restuarant) => {
                    return(
                        <Link to= {"/restaurant/"+restuarant.data.id}  key = {restuarant.data.id}>
                            <RestaurantCard {...restuarant.data}/>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Body;