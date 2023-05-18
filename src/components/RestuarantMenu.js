import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { IMG } from "../config";
import Shimmer from "./shimmer";

const restaurantMenu = () =>{
    const params = useParams();
    const {id} = params;
    const [restuarant, setRestuarant] = useState(null) // null here ??

    useEffect(()=>{
        getRestaurantInfo();
    },[]);

    
    async function getRestaurantInfo(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId="+ id +"&submitAction=ENTER");
        const json = await data.json();
        console.log(json.data);
        setRestuarant(json.data);
    }

    return !restuarant ? (
        <div className= "shimmer-ui">
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
        </div>
    ):(
        <div class="menu">
            <div>
                <h1>Restaurant id: {id}</h1>
                <h2>{restuarant?.cards[0]?.card?.card?.info?.name}</h2>
                <img src={IMG + restuarant?.cards[0]?.card?.card?.info?.cloudinaryImageId}/>
                <h3>{restuarant?.cards[0]?.card?.card?.info?.area}</h3>
                <h3>{restuarant?.cards[0]?.card?.card?.info?.city}</h3>
                <h3>{restuarant?.cards[0]?.card?.card?.info?.avgRating} Stars</h3>
                <h3>{restuarant?.cards[0]?.card?.card?.info?.costForTwoMessage}</h3>
            </div>
            <div>
                <h1>Recommended</h1>
                <ul>
                    {restuarant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards.map((itemcard)=><li key={itemcard.card.info.id}>{itemcard.card.info.name}</li>)}
                </ul>
            </div>
        </div>
    );
};
export default restaurantMenu;