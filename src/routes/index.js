import { Navigate } from "react-router-dom";
import CityList from "../pages/CityList";
import Home from "../pages/HomePage";
import News from "../pages/HomePage/News";
import Profile from "../pages/HomePage/Profile";
import Search from "../pages/search";
import Chat from "../pages/chat/chat";

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
	},
    {
        path:'/chat',
		element:<Chat/>
    }
]

export default Routers