import { Navigate, Router, Routes,Route } from "react-router-dom";
import CityList from "../pages/CityList";
import Home from "../pages/HomePage";
import News from "../pages/HomePage/News";
import Profile from "../pages/HomePage/profile";
import Search from "../pages/search";

const Routers = [
    {
        path:'/home',
        element:<Home/>,
        exact:true,
        children:[
           
        ]
    },
    {
        exact:true,
        path:'/home/news',
        element:<News/>
        
    },
    {
        exact:true,
        path:'/home/profile',
        element:<Profile/>
    },
    {
        exact:true,
        path:'/home/search',
        element:<Search/>
    },
    {
        path:'/citylist',
        element:<CityList/>
    },
    {
		path:'/',
        exact:true,
		element:<Navigate to="/home"/>
	}
]

export default Routers