import styles from '../index.module.css'
import { Grid } from 'antd-mobile';
import HousePackage from '../../../components/HousePackage/index.js'
import { BASE_URL } from '../../../utils/url.js';

const Info = ({
    floor,
    oriented,
    price,
    roomType,
    size,
    tags,
    title,
    community,
    supporting,
    description
}) => {
    return (
        <>
            <div className={styles.info}>
                <h3 className={styles.infoTitle}>
                    {title}
                </h3>
                <Grid columns={1}>
                    <Grid.Item>
                        {tags.map((item, index) => (
                            <span
                                key={item}
                                className={`${styles.tag} ${styles.tags} ${styles['tag' + (index % 4 + 1)]}`}
                            >
                                {item}
                            </span>
                        ))}
                    </Grid.Item>
                </Grid>
                <Grid
                    columns={3}
                    className={styles.infoPrice}
                >
                    <Grid.Item className={styles.infoPriceItem}>
                        <div>
                            {price}
                            <span className={styles.month}>/月</span>
                        </div>
                        <div>租金</div>
                    </Grid.Item>
                    <Grid.Item className={styles.infoPriceItem}>
                        <div>{roomType}</div>
                        <div>房型</div>
                    </Grid.Item>
                    <Grid.Item className={styles.infoPriceItem}>
                        <div>{size}平方</div>
                        <div>面积</div>
                    </Grid.Item>
                </Grid>
                <Grid
                    columns={1}
                    className={styles.infoBasic}
                >
                    <Grid.Item>
                        <div>
                            <span className={styles.title}>装修：</span>
                            精装
                        </div>
                        <div>
                            <span className={styles.title}>楼层：</span>
                            {floor}
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div>
                            <span className={styles.title}>朝向：</span>
                            {oriented.join('、')}
                        </div>
                        <div>
                            <span className={styles.title}>类型：</span>
                            普通住宅
                        </div>
                    </Grid.Item>
                </Grid>
            </div>
            <div className={styles.map}>
                <div className={styles.mapTitle}>
                    小区：
                    <span>{community}</span>
                </div>
                <div className={styles.mapContainer} id="map">
                    地图
                    
                </div>
            </div>
            <div className={styles.set}>
                <div className={styles.houseTitle}>房屋配套</div>
                {
                    supporting.length === 0
                        ? <div className={styles.titleEmpty}>暂无数据</div>
                        : <HousePackage list={supporting} />
                }
            </div>
            <div className={styles.about}>
                <div className={styles.houseTitle}>房屋概况</div>
                <div className={styles.contact}>
                    <div className={styles.user}>
                        <img
                            src={BASE_URL + '/img/avatar.png'}
                            alt="头像"
                        />
                        <div className={styles.userInfo}>
                            <div>张女士</div>
                            <div className={styles.userAuth}>
                                <i className="iconfont icon-auth" />
                                已认证房主
                            </div>
                        </div>
                    </div>
                    <span className={styles.userMsg}>发消息</span>
                </div>
                <div className={styles.descText}>
                    {description || '暂无房屋数据'}
                </div>
            </div>
        </>
    );
};

export default Info;