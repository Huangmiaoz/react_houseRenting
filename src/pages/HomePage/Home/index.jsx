import React, { useEffect, useState } from 'react'
import { axiosAPI as axios} from '../../../utils/axios'
import {BASE_URL} from '../../../utils/url'

import { Swiper,Grid } from 'antd-mobile'

import Nav1 from '../../../asserts/images/nav-1.png';
import Nav2 from '../../../asserts/images/nav-2.png';
import Nav3 from '../../../asserts/images/nav-3.png';
import Nav4 from '../../../asserts/images/nav-4.png';
import { useNavigate } from 'react-router-dom'
import { useCity } from '../../../utils/city'

// 首页
export default function Home() {
  const [cityValue, cityLabel] = useCity();

  return (
    <div>
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

// 轮播图
const Swipers = () => {
   // 设置轮播图数据和加载状态state
   const [swipers, setSwipers] = useState([]);
   const [swipersLoaded, setSwipersLoaded] = useState(false);
    console.log('swiper');
   // 第一次挂载组件时获取轮播图数据
   useEffect(() => {
    const getSwipers = async () => {
        const swipersRes = await axios.get(`/home/swiper`);
        console.log('swipersRes',swipersRes)
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

// 菜单栏
const Menu = () => {
  const menus = [
    {
      id: 1,
      img: Nav1,
      title: '整租',
      path: '/home/search'
    },
    {
      id: 2,
      img: Nav2,
      title: '合租',
      path: '/home/search'
    },
    {
      id: 3,
      img: Nav3,
      title: '地图找房',
      path: '/mappage'
    },
    {
      id: 4,
      img: Nav4,
      title: '去出租',
      path: '/rent/add'
    },
  ]

  const history = useNavigate();

  return (
    <Grid columns={4} gap={8}
      style={{padding: '10px 0'}}
    >

      {menus.map((item) => (
        <Grid.Item
            key={item.id}
            onClick={() => history(item.path)}
            style={{display:'flex',flexDirection:'column',alignItems:'center'}}
        >
          <div>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: '48px' }}
            />
            <h2 
              style={{ marginTop:'6px',fontSize:'16px',fontWeight:'normal' }}
            >
              {item.title}
            </h2>
          </div>
        </Grid.Item>))
      }
    </Grid>
  )
}

// 租房小组
const Groups = ({ cityValue }) => {
  // 设置租房小组数据和加载状态state
  const [groups, setGroups] = useState([]);
  const [groupsLoaded, setGroupsLoaded] = useState(false);
  console.log('group')
  // 第一次挂载组件时获取当前城市租房小组数据
  useEffect(() => {
      const getGroups = async (id) => {
          const groupsRes = await axios.get(`/home/groups`, {
              params: {
                  area: id
              }
          });
          console.log('groupsRes',groupsRes)
          setGroups(groupsRes.data.body);
          setGroupsLoaded(true);
      };

      getGroups(cityValue);

      // 卸载组件时取消加载状态，防止内存溢出
      return () => {
          setGroupsLoaded(false);
      };
  }, [cityValue]);

  // 生成租房小组数据
  const groupItems = groups.map((item) => (
      <Grid.Item key={item.id}>
          <div style={{float: 'left',position: 'relative',top: '5px',left: '30px'}}>
              <p style={{ fontSize: '13px',fontWeight:'700'}}>{item.title}</p>
              <span style={{fontSize: '12px',color:'#999'}}>{item.desc}</span>
          </div>
          <img
              src={`${BASE_URL}${item.imgSrc}`}
              alt={item.title}
              style={{position:'relative',top: '5px',left: '50px',height: '55px'}}   
          />
      </Grid.Item>
  ));

  return (
      // 判断是否有加载租房小组数据，如已加载则显示租房小组
      groupsLoaded && <Grid columns={2} gap={10}>{groupItems}</Grid>
  );
};


const News = ({ cityValue }) => {
  // 设置最新资讯数据和加载状态state
  const [news, setNews] = useState([]);
  const [newsLoaded, setNewsLoaded] = useState(false);

  // 第一次挂载组件时获取当前城市最新资讯数据
  useEffect(() => {
      const getNews = async (id) => {
          const newsRes = await axios.get(`/home/news`, {
              params: {
                  area: id
              }
          });
          setNews(newsRes.data.body);
          setNewsLoaded(true);
      };

      getNews(cityValue);

      // 卸载组件时取消加载状态，防止内存溢出
      return () => {
          setNewsLoaded(false);
      };
  }, [cityValue]);

  // 生成最新资讯数据
  const newsItems = news.map((item) => (
    <Grid.Item key={item.id}>
      <img
          src={`${BASE_URL}${item.imgSrc}`}
          alt={item.title}
          style={{width:'150px',float:'left'}}
      />
      <div style={{overflow: 'hidden',position: 'relative',height: '100%',paddingLeft: '12px'}}>
          <h2 style={{ marginBottom: '15px',fontSize: '14px'}}>{item.title}</h2>
          <span style={{position: 'absolute',bottom: '0px',fontSize: '12px',color: '#9c9fa1'}}>{item.from}</span>
          <span style={{position: 'absolute',bottom: '0px',fontSize: '12px',color: '#9c9fa1',right: '15px'}}>{item.date}</span>
      </div>
    </Grid.Item >
  ));

  return (
      // 判断是否有加载最新资讯数据，如已加载则显示最新资讯
      newsLoaded && <Grid columns={1}>{newsItems}</Grid>
  );
};