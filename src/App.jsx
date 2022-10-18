import { Navigate, Routes,Route } from "react-router-dom";
import CityList from './pages/CityList/index.jsx';
import Home from './pages/HomePage/Home/index.jsx';
import News from './pages/HomePage/News/index.jsx';
import Search from './pages/HomePage/Search/index.jsx';
import Profile from "./pages/HomePage/profile/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import MapPage from "./pages/MapPage/index.jsx";

// import './index.css'
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
    </Routes>
  )
};

export default App;
