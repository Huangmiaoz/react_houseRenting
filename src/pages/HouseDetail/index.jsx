import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { axiosAPI as axios } from '../../utils/axios.js';
import Navbar from '../../components/Navbar/index.js'
import styles from './index.module.css'
import Swipers from './components/Swipers.jsx';
import Info from './components/Info.jsx';
import Buttons from './components/Buttons.jsx'
import Like from './components/Like.jsx';

const HouseDetail = () => {
    // 获取params
    const { id } = useParams();
    // 设置房屋详情和加载状态state
    const [houseData, setHouseData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    
    const getHouseDetail = async (houseId) => {
        const result = await axios.get(`/houses/${houseId}`);
        // 更新房屋详情和加载状态
        setHouseData(result.data.body);
        setDataLoaded(true);
    };

    useEffect(() => {
        getHouseDetail(id);

        // 卸载时取消加载状态，防止内存溢出
        return () => {
            setDataLoaded(false);
        };
    }, [id]);

    // 获取房屋详情中的各数据
    const {
        community,
        coord,
        description,
        floor,
        houseImg,
        oriented,
        price,
        roomType,
        size,
        supporting,
        tags,
        title,
    } = houseData;

    return (
        <div className={styles.root}>
            <Navbar
                styles={styles}
                title={community ? community : '房源详情'}
                right={(
                    <i
                        className="iconfont icon-share"
                        onClick={() => Toast.show({ content: '暂未开通该功能' })}
                    />
                )}
            />
            {/* 获取房屋详情后再显示此部分内容 */}
            {dataLoaded && (
                <>
                    <Swipers
                        className={styles.slides}
                        swipers={houseImg}
                    />
                    <Info
                        floor={floor}
                        oriented={oriented}
                        price={price}
                        roomType={roomType}
                        size={size}
                        tags={tags}
                        title={title}
                        community={community}
                        coord={coord}
                        supporting={supporting}
                        description={description}
                    />
                    <Like />
                </>
            )}
            <Buttons houseId={id}/>    
        </div>
    );
};

export default HouseDetail;