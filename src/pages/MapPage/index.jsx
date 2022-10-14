import React, { useEffect } from 'react'
import { NavBar } from 'antd-mobile'
import { getCity } from '../../utils/city'
import { useNavigate } from 'react-router-dom';
import MyNavBar from '../../components/NavBar';
const MapPage = () =>  {
  const history = useNavigate();
  const back =() => {
    history(-1);
  }
  const curCity = getCity();
  console.log(curCity);
  useEffect(()=>{
    // 在react脚手架中全局对象要使用window访问
    const map = new window.BMapGL.Map('container');
    // 设置中心点坐标,传入的是地点的经纬度
    const point = new window.BMapGL.Point(116.404,39.915);
    // 初始化地图并且设置展示级别
    console.log('map',map,'point',point);
    map.centerAndZoom(point,15)
  })


  return (
    <div style={{height:'100%',width:'100%'}}>
      {/* 地图元素 */}
      <MyNavBar>地图找房</MyNavBar>
      <div id='container' style={{height:'100%'}} />

    </div>
  )
}

export default MapPage;