import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import {Title, Header} from "./components/Header"
import Footer from "./components/Footer";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestuarantMenu";

const AppLayout = () =>{
    return(
        <React.Fragment>
            <Header/>
            <Outlet />
            <Footer/>
        </React.Fragment>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Body/>
            }, 
            {
                path: "/about",
                element: <About/>,
                children: [{
                    path: "profile",
                }],
            }, 
            {
                path: "/contact",
                element: <Contact/>
            }, 
            {
                path: "/restaurant/:id",
                element: <RestaurantMenu/>
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);