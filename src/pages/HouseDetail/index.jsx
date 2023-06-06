import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast, Modal } from 'antd-mobile';
import { axiosAPI as axios } from '../../utils/axios.js';
import { isAuth } from '../../utils/auth.js'
import Navbar from '../../components/Navbar/index.js'
import styles from './index.module.css'

import Swipers from './components/Swipers.jsx';
import Info from './components/Info.jsx';
import Buttons from './components/Buttons.jsx'
import Like from './components/Like.jsx';

// 设置百度地图全局常量
const BMapGL = window.BMapGL;

const HouseDetail = () => {
    // 获取params
    const { id } = useParams();

    const history = useNavigate();

    // 设置房屋详情和加载状态state
    const [houseData, setHouseData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const getHouseDetail = async (houseId) => {
            const result = await axios.get(`/houses/${houseId}`);

            // 更新房屋详情和加载状态
            setHouseData(result.data.body);

            setDataLoaded(true);

            // 获取坐标和小区名称
            const { coord, community } = result.data.body;

            const renderMap = (coord, community) => {
                const { longitude, latitude } = coord;

                // 创建地图实例
                const map = new BMapGL.Map('map');

                // 创建坐标实例
                const point = new BMapGL.Point(longitude, latitude);
                map.centerAndZoom(point, 16);

                // 禁止地图拖动
                map.disableDragging();

                // 添加缩放控件
                const zoomCtrl = new BMapGL.ZoomControl();
                map.addControl(zoomCtrl);

                // 创建覆盖物
                const label = new BMapGL.Label('', {
                    position: point,
                    offset: new BMapGL.Size(0, -35)
                });

                // 设置房源覆盖物内容
                label.setContent(`
                    <div class="${styles.rect}">
                        <span class="${styles.housename}">${community}</span>
                        <i class="${styles.arrow}"></i>
                    </div>
                `);

                // 设置样式
                label.setStyle({
                    cursor: 'pointer',
                    border: '0px solid rgb(255, 0, 0)',
                    padding: '0px',
                    whiteSpace: 'nowrap',
                    fontSize: '14px',
                    color: 'rgb(255, 255, 255)',
                    textAlign: 'center'
                });

                // 添加覆盖物到地图中
                map.addOverlay(label);
            };

            // 渲染房屋地图
            renderMap(coord, community);
        };

        getHouseDetail(id);

        // 卸载时取消加载状态，防止内存溢出
        return () => {
            setDataLoaded(false);
        };
    }, [id]);

    // 设置是否被收藏的state
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async (houseId) => {
            const isLogin = isAuth();

            // 未登录状态直接退出判断
            if (!isLogin) {
                return;
            }

            const result = await axios.get(`/user/favorites/${houseId}`);
            // console.log('checkFavorite',result)
            const { status, body } = result.data;

            if (status === 200) {
                setIsFavorite(body.isFavorite);
            }
        };

        checkFavorite(id);
    }, [id]);

    const handleFavorite = async () => {
        const isLogin = isAuth();

        if (isLogin) {
            if (isFavorite) {
                const result = await axios.delete(`/user/favorites/${id}`);

                if (result.data.status === 200) {
                    setIsFavorite(false);

                    Toast.show({ content: '已取消收藏' });
                } else {
                    Toast.show({ content: '登录超时，请重新登录' });
                }
            } else {
                const result = await axios.post(`/user/favorites/${id}`);

                if (result.data.status === 200) {
                    setIsFavorite(true);

                    Toast.show({ content: '已收藏' });
                } else {
                    Toast.show({ content: '登录超时，请重新登录' });
                }
            }
        } else {
            return Modal.confirm({
                title: '提示',
                content: '登录后才能收藏房源，是否去登录？',
                confirmText: '去登录',
                onConfirm: () => { history('/login') }
            });
        }
    };

    // 获取房屋详情中的各数据
    const {
        community,
        description,
        floor,
        houseImg,
        oriented,
        price,
        roomType,
        size,
        supporting,
        tags,
        title
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
                        supporting={supporting}
                        description={description}
                    />
                    <Like />
                </>
            )}
            <Buttons
                isFavorite={isFavorite}
                handleFavorite={handleFavorite}
            />
        </div>
    );
};

export default HouseDetail;