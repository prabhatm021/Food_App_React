import { IMG } from "../config";

const RestaurantCard = ({name,area,cuisines,cloudinaryImageId}) =>{
    return(
         <div className="card"> 
            <img src = {IMG + cloudinaryImageId}/>
            <h2>{name}</h2>
            <h3>{area}</h3>
            <h3>{cuisines.join(", ")}</h3> 
         </div>
    );
};

export default RestaurantCard