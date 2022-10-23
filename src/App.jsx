import { Navigate, Routes, Route } from "react-router-dom";
import CityList from './pages/CityList/index.jsx';
import Home from './pages/HomePage/Home/index.jsx';
import News from './pages/HomePage/News/index.jsx';
import Search from './pages/HomePage/Search/index.jsx';
import Profile from "./pages/HomePage/Profile/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import MapPage from "./pages/MapPage/index.jsx";
import HouseDetail from './pages/HouseDetail/index.jsx'
import Login from './pages/Login/index.jsx'
import Register from './pages/Register/index.js'
// 路由访问控制组件
import AuthRoute from "./components/AuthRoute/index.js";
import Favorite from "./pages/Favorite/index.js";
import RentSearch from './pages/Rent/RentSearch/index.js'
import RentAdd from "./pages/Rent/RentAdd/index.js";
import Rent from "./pages/Rent/index.js";

function App() {
  return (
    <Routes>
      {/* 默认打开/home页面 */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} >
        <Route path="/home" element={<Home />} />
        <Route path="/home/search" exact element={<Search />} />
        <Route path="/home/news" exact element={<News />} />
        <Route path="/home/profile" exact element={<Profile />} />
      </Route>
      <Route path="/citylist" element={<CityList />} />
      <Route path="/mappage" element={<MapPage />} />
      <Route path="/detail/:id" element={<HouseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* 登录后才能访问的页面————AuthRoute */}
      <Route
        path="/favorite"
        element={(
          <AuthRoute>
            <Favorite />
          </AuthRoute>
        )}
      />
      <Route
        path="/rent"
        exact
        element={(
          <AuthRoute>
            <Rent />
          </AuthRoute>
        )}
      />
      <Route
        path="/rent/add"
        element={(
          <AuthRoute>
            <RentAdd />
          </AuthRoute>
        )}
      /><Route
        path="/rent/search"
        element={(
          <AuthRoute>
            <RentSearch />
          </AuthRoute>
        )}
      />
    </Routes>
  )
};

export default App;
