import { useState } from "react";
import { Link } from "react-router-dom";

export const Title = () => {
    return (
        <a href = "/">
            <h1>
            FOOD BITS 
            </h1>
        </a>
    );
}

const loggedInUser = () => {
    return true;
};
 
export const Header = () =>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className = "header">
            <Title/>
            <div className = "nav-items">
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/contact">
                        <li>Contact</li>
                    </Link>
                    <li>Cart</li>
                </ul>
            </div>
            {
                isLoggedIn ? (<button onClick={() => setIsLoggedIn(false)}>logout</button> ) : ( <button onClick={() => setIsLoggedIn(true)}>login</button>)
            }
            
        </div>
    );
};





