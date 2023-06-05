import { Skeleton } from 'antd-mobile';
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Home from './pages/HomePage/Home/index.jsx';
import HomePage from './pages/HomePage/index.jsx';

import CityList from './pages/CityList/index.jsx';
import News from './pages/HomePage/News/index.jsx';
import Search from './pages/HomePage/Search/index.jsx';
import Profile from "./pages/HomePage/Profile/index.jsx";
// const HomePage = lazy(() =>import ("./pages/HomePage/index.jsx"));
import MapPage from "./pages/MapPage/index.jsx";
import HouseDetail from './pages/HouseDetail/index.jsx';
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.js';
// 路由访问控制组件
import Favorite from "./pages/Favorite/index.js";
import RentSearch from './pages/Rent/RentSearch/index.js';
import RentAdd from "./pages/Rent/RentAdd/index.js";
import Rent from "./pages/Rent/index.js";

import Error from "./pages/Error/index.jsx"

function App() {
  return (
    <Routes>
        {/* 默认打开/home页面 */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* 设置加载指示器 */}
        
        <Route path="/home" element={<HomePage />} >
          <Route path="/home" element={<Home />} />
          {/* <Suspense fallback={<Loading />}> */}
            <Route path="/home/search" exact element={<Search />} />
            <Route path="/home/news" exact element={<News />} />
            <Route path="/home/profile" exact element={<Profile />} />
          {/* </Suspense> */}
        </Route>
        {/* <Suspense fallback={<Loading />}> */}
          <Route path="/citylist" element={<CityList />} />
          <Route path="/mappage" element={<MapPage />} />
          <Route path="/detail/:id" element={<HouseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<Error />} />
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
        {/* </Suspense> */}
    </Routes>
  )
};

export default App;

const Loading = () => {
  return (
      <>
          <Skeleton.Title animated={true} />
          <Skeleton.Paragraph animated={true} />
      </>
  )
}


// const CityList = lazy(() =>import ('./pages/CityList/index.jsx'));
// const News = lazy(() =>import ('./pages/HomePage/News/index.jsx'));
// const Search  = lazy(() =>import ('./pages/HomePage/Search/index.jsx'));
// const Profile = lazy(() =>import ("./pages/HomePage/Profile/index.jsx"));
// // const HomePage = lazy(() =>import ("./pages/HomePage/index.jsx"));
// const MapPage = lazy(() =>import ("./pages/MapPage/index.jsx"));
// const HouseDetail = lazy(() =>import ('./pages/HouseDetail/index.jsx'));
// const Login = lazy(() =>import ('./pages/Login/index.jsx'));
// const Register = lazy(() =>import ('./pages/Register/index.js'));
// // 路由访问控制组件
// const Favorite = lazy(() =>import ("./pages/Favorite/index.js"));
// const RentSearch = lazy(() =>import ('./pages/Rent/RentSearch/index.js'));
// const RentAdd = lazy(() => import ("./pages/Rent/RentAdd/index.js"));
// const Rent = lazy(() =>import ("./pages/Rent/index.js"));