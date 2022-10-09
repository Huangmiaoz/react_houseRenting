import React, { useEffect, useState } from 'react'
import { axiosAPI as axios} from '../../../utils/axios'
import {BASE_URL} from '../../../utils/url'

import { Grid } from 'antd-mobile'

export default function News({ cityValue }) {
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
    <Grid.Item key={item.id} style={{backgroundColor:'#fff',margin:'5px'}}>
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
}
