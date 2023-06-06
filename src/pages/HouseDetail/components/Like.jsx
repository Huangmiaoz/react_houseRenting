import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCity } from '../../../utils/city';
import styles from '../index.module.css'
import { BASE_URL } from '../../../utils/url.js';
import { axiosAPI as axios } from '../../../utils/axios.js';
import HouseItems from '../../../components/HouseItems/HouseItems';

// 猜你喜欢模块，获取一个随机数，然后随机推荐3套房源
const Like = () => {
    // 获取当前城市id
    const { cityValue } = useCity();

    // 设置房源列表和房源数量state
    const [list, setList] = useState([]);

    const history = useNavigate();

    useEffect(() => {
        // 随机获取3套房源
        const getHouseList = async (id, start) => {
            const result = await axios.get(`/houses`, {
                params: {
                    cityId: id,
                    start: start,
                    end: start + 2,
                }
            });

            // 更新房源列表和房源数量
            setList(result.data.body.list);
        };

        // 随机生成一个1000以内整数
        const start = Math.floor(Math.random() * (1000 - 1)) + 1;

        getHouseList(cityValue, start);

        // 卸载时清空获取的房源，防止内存泄漏
        return () => {
            setList([]);
        }
    }, [cityValue]);

    return (
        <div className={styles.like}>
            <div className={styles.likeTitle}>猜你喜欢</div>
            {list.map((house) => (
                <div
                    key={house.houseCode}
                    className={styles.house}
                >
                    <HouseItems
                        src={BASE_URL + house.houseImg}
                        title={house.title}
                        desc={house.desc}
                        tags={house.tags}
                        price={house.price}
                        onClick={() => { history(`/detail/${house.houseCode}`) }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Like;