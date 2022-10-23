import React, { useEffect, useState } from 'react'
import { isAuth, getToken, removeToken } from '../../../utils/auth';
import { BASE_URL } from '../../../utils/url';
import { axiosAPI as axios } from '../../../utils/axios';
import { Button, Grid, Modal } from 'antd-mobile';

import styles from './index.module.css'
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const menus = [
        { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorite' },
        { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
        { id: 3, name: '看房记录', iconfont: 'icon-record' },
        { id: 4, name: '成为房主', iconfont: 'icon-identity' },
        { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
        { id: 6, name: '联系我们', iconfont: 'icon-cust' }
    ];

    const history = useNavigate();

    // 游客头像地址
    const DEFAULT_AVATAR = `${BASE_URL}/img/profile/avatar.png`;

    const [isLogin, setIsLogin] = useState(false);
    // setIsLogin(isAuth()); 报错了。。Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.(不能在这里调用)


    // 设置用户信息state
    const [userInfo, setUserInfo] = useState(
        {
            avatar: '',
            nickname: ''
        }
    );
    useEffect(() => {
        const getUserInfo = async (status) => {
            // 如果没有登陆则直接返回
            if (!status) {
                return;
            } else {
                // 登录了的话就去数据库查询用户信息
                const userInfoResult = await axios.get('/user', {
                    headers: {
                        authorization: getToken()
                    }
                });
                if (userInfoResult.data.status === 200) {
                    const { avatar, nickname } = userInfoResult.data.body;

                    setUserInfo(
                        {
                            avatar: BASE_URL + avatar,
                            nickname: nickname
                        }
                    );
                } else {
                    // 如果没有获取到该用户的信息，则将登陆状态设置为false
                    setIsLogin(false)
                }

                console.log('userInfoResult', userInfoResult)
            }

        }
        // 先通过auth的方法获取当前是否已经登陆
        setIsLogin(isAuth());

        getUserInfo(isLogin);
    }, [isLogin])

    // 退出登录功能
    const logout = () => {
        Modal.confirm({
            title: '是否确定退出登录？',
            onConfirm: async () => {
                // 服务器端登出
                await axios.post('/user/logout', null, {
                    headers: {
                        authorization: getToken()
                    }
                });

                // 本地删除token并设置登录状态和清空用户信息
                removeToken();
                // 将状态改为false，使得界面的展示也发生变化
                setIsLogin(false);

                setUserInfo(
                    {
                        avatar: '',
                        nickname: ''
                    }
                );
            }
        })
    };
    return(
        <>
            <div className={styles.root}>
                <div className={styles.title}>
                    <img
                        className={styles.bg}
                        src={`${BASE_URL}/img/profile/bg.png`}
                        alt="背景图"
                    />
                    <div className={styles.info}>
                        <div className={styles.myIcon}>
                            <img
                                className={styles.avatar}
                                src={userInfo.avatar ? userInfo.avatar : DEFAULT_AVATAR}
                                alt="icon"
                            />
                        </div>
                        <div className={styles.user}>
                            <div className={styles.name}>{userInfo.nickname ? userInfo.nickname : "游客"}</div>
                            {isLogin
                                ? (
                                    <>
                                        <div className={styles.auth}>
                                            <span onClick={logout}>退出</span>
                                        </div>
                                        <div className={styles.edit}>
                                            编辑个人资料
                                            <span className={styles.arrow}>
                                                <i className="iconfont icon-arrow" />
                                            </span>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <div className={styles.edit}>
                                            <Button
                                                color="success"
                                                size="small"
                                                onClick={() => { history(`/login`) }}>
                                                去登录
                                            </Button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Grid columns={3}>
                    {menus.map((item) =>
                        item.to
                            ? (
                                <Grid.Item key={item.id}>
                                    <Link to={item.to}>
                                        <div className={styles.menuItem}>
                                            <i className={`iconfont ${item.iconfont}`} />
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </Grid.Item>
                            )
                            : (
                                <Grid.Item key={item.id}>
                                    <div className={styles.menuItem}>
                                        <i className={`iconfont ${item.iconfont}`} />
                                        <span>{item.name}</span>
                                    </div>
                                </Grid.Item>
                            )
                    )}
                </Grid>
                <div className={styles.ad}>
                    <img
                        src={`${BASE_URL}/img/profile/join.png`}
                        alt="加入我们"
                    />
                </div>
            </div>
        </>
    )
}

export default Profile;