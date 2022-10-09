import React from 'react'
import { TabBar } from 'antd-mobile';
import { useLocation, Outlet, useNavigate} from 'react-router-dom';
import { SearchOutline, TextOutline,UserOutline,UnorderedListOutline } from 'antd-mobile-icons'
import styles from './index.css'


export default function HomePage() {
  
  return (
    <>
      <div className={styles.homepage}>
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