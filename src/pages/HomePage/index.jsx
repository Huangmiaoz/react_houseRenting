import React from 'react'

import { TabBar } from 'antd-mobile';
import { useLocation, Outlet, useNavigate} from 'react-router-dom';
import { SearchOutline, TextOutline,UserOutline,UnorderedListOutline } from 'antd-mobile-icons'
// import { useCity } from '../../utils/city';


export default function HomePage() {
  // 获取当前城市

  return (
    <>
      <div style={{paddingBottom: '10px', backgroundColor:'#F5F5F5'}}>
        {/* 设置Router出口 */}
        <Outlet />
      </div>
      <Bottom />
    </>
    
  )
}

// 底部导航栏
const Bottom = () => {
  const history = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const tabs = [
      {
          key: '/home',
          title: '首页',
          icon: <UnorderedListOutline fontSize={24} color='#21b97a'/>,
      },
      {
          key: '/home/search',
          title: '找房',
          icon: <SearchOutline fontSize={24} color='#21b97a'/>,
      },
      {
          key: '/home/news',
          title: '资讯',
          icon: <TextOutline fontSize={24} color='#21b97a'/>,
      },
      {
          key: '/home/profile',
          title: '我的',
          icon: <UserOutline fontSize={24} color='#21b97a'/>,
      },
  ];
  return (
    <TabBar 
      activeKey={pathname} 
      onChange={value => history(value)}
    >
      {tabs.map(item => (
        <TabBar.Item 
          key={item.key} 
          icon={item.icon} 
          title={item.title}
        />)
      )}
    </TabBar>
  );
};