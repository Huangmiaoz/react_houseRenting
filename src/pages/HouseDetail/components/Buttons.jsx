import styles from '../index.module.css'
import { BASE_URL } from '../../../utils/url.js';
import { Toast } from 'antd-mobile';

const Buttons = ({
    isFavorite,
    handleFavorite
}) => {
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