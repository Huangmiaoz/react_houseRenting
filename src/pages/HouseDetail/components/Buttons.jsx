import styles from '../index.module.css'
import { BASE_URL } from '../../../utils/url.js';
import { Toast } from 'antd-mobile';
import { isAuth } from '../../../utils/auth.js'
import { useEffect,useState } from 'react';
import { axiosAPI as axios } from '../../../utils/axios.js';
import { Modal } from 'antd-mobile';
const Buttons = ({houseId}) => {
    // 设置是否被收藏的state
    const [isFavorite, setIsFavorite] = useState(false);
    
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

    const handleFavorite = async () => {
        const isLogin = isAuth();

        if (isLogin) {
            if (isFavorite) {
                const result = await axios.delete(`/user/favorites/${houseId}`);

                if (result.data.status === 200) {
                    setIsFavorite(false);

                    Toast.show({ content: '已取消收藏' });
                } else {
                    Toast.show({ content: '登录超时，请重新登录' });
                }
            } else {
                const result = await axios.post(`/user/favorites/${houseId}`);

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
                // onConfirm: () => history('/login')
            });
        }
    };

    useEffect(() => {
        checkFavorite(houseId);
    }, [houseId]);

    return (
        <div className={styles.buttons}>
            <span className={styles.favorite}
                onClick={() => handleFavorite(!isFavorite)}
            >
                <img
                    src={isFavorite ? `${BASE_URL}/img/star.png` : `${BASE_URL}/img/unstar.png`}
                    alt="收藏"
                />
                {isFavorite ? '已收藏' : '收藏'}
            </span>
            <span
                className={styles.consult}
                onClick={
                    () => Toast.show({
                        content: '暂未开通该功能'
                    })
                }
            >在线咨询</span>
            <span 
                className={styles.reserve}
                onClick={
                    () => Toast.show({
                        content: '暂未开通该功能'
                    })
                }
            >
                <a href="tel: ">电话预约</a>
            </span>
        </div>
    );
};

export default Buttons;