import React from 'react'

import MySearchBar from '../../../components/MySearchBar'

import { useCity } from '../../../utils/city'
import News from '../News';
import Swipers from './components/Swipers'
import Menu from './components/Menu';
import Groups from './components/Groups';

// 首页
export default function Home() {
  const [cityValue,cityLabel] = useCity();

  return (
    <div>
      <MySearchBar city={cityLabel}/>
      {/* 轮播图和导航菜单栏 */}
      <Swipers/>
      <Menu/>
      {/* 租房小组 */}
      <div>
        <div style={{ display:'flex',justifyContent: 'space-between' }}>
          <h3>租房小组</h3>
          <h3>更多</h3>
        </div>
        <Groups cityValue={cityValue} />
      </div>
      {/* 最新资讯 */}
      <div style={{paddingTop:'10px'}}>
          <h3>最新资讯</h3>
          <News cityValue={cityValue} />
      </div>
    </div>
  )
}

