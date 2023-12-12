import React, { useEffect, useState } from 'react'
import { axiosAPI as axios} from '../../../../utils/axios'
import {BASE_URL} from '../../../../utils/url'
import { Grid } from 'antd-mobile';
// 租房小组
export default function Groups ({ cityValue })  {
    // 设置租房小组数据和加载状态state
    const [groups, setGroups] = useState([]);
    const [groupsLoaded, setGroupsLoaded] = useState(false);
    // console.log('group')
    // 第一次挂载组件时获取当前城市租房小组数据
    useEffect(() => {
        const getGroups = async (id) => {
            const groupsRes = await axios.get(`/home/groups`, {
                params: {
                    area: id
                }
            });
            // console.log('groupsRes',groupsRes)
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
        <Grid.Item key={item.id} style={{backgroundColor:'#fff',height:'65px',width:'160px'}}>
            <div style={{float: 'left',position: 'relative',top: '5px',left: '30px'}}>
                <p style={{ fontSize: '13px',fontWeight:'700'}}>{item.title}</p>
                <span style={{fontSize: '12px',color:'#999' ,paddingBottom:'3px'}}>{item.desc}</span>
            </div>
            <img
                src={`${BASE_URL}${item.imgSrc}`}
                alt={item.title}
                style={{position:'relative',top: '5px',left: '35px',height: '55px'}}   
            />
        </Grid.Item>
    ));
  
    return (
        // 判断是否有加载租房小组数据，如已加载则显示租房小组
        groupsLoaded && <Grid columns={2} gap={10}>{groupItems}</Grid>
    );
  };
  