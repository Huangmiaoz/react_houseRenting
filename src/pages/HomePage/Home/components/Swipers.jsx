import React, { useEffect, useState } from 'react'
import { axiosAPI as axios} from '../../../../utils/axios'
import {BASE_URL} from '../../../../utils/url'
import { Swiper } from 'antd-mobile'


export default function Swipers () {
    // 设置轮播图数据和加载状态state
    const [swipers, setSwipers] = useState([]);
    const [swipersLoaded, setSwipersLoaded] = useState(false);
     // console.log('swiper');
    // 第一次挂载组件时获取轮播图数据
    useEffect(() => {
     const getSwipers = async () => {
         const swipersRes = await axios.get(`/home/swiper`);
         // console.log('swipersRes',swipersRes)
         setSwipers(swipersRes.data.body);
         setSwipersLoaded(true);
     };
 
     getSwipers();
 
     // 卸载组件时取消加载状态，防止内存溢出
     return () => {
         setSwipersLoaded(false);
     };
   }, []);
 
   // 生成轮播图
   const swiperItems = swipers.map((item) => (
     <Swiper.Item key={item.id}>
         <div>
             <img
                 src={`${BASE_URL}${item.imgSrc}`}
                 alt=""
                 style={{ width: '100%' }}
             />
         </div>
     </Swiper.Item>
   ));
 
   return (
       // 判断是否有加载轮播图，如已加载则显示轮播图,如果数据还未加载完就去渲染会有问题
       swipersLoaded && <Swiper autoplay loop style={{ width: '100%' }}>{swiperItems}</Swiper>
   );
 
 }