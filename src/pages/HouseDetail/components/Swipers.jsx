import { Swiper } from 'antd-mobile';
import { BASE_URL } from '../../../utils/url.js';

const Swipers = ({ swipers }) => {
    const swiperItems = swipers.map((item, index) => (
        // 部分图片重复，防止出现相同key，加入index作为key的一部分
        <Swiper.Item key={item + index}>
            <img
                src={BASE_URL + item}
                // 因为图片大小不同，为防止拉伸，只指定宽度，可能会出现下方留白的情况
                style={{ width: '100%' }}
                alt="房屋图片"
            />
        </Swiper.Item>
    ));

    return (
        <Swiper autoplay loop> {swiperItems}</Swiper>
    );
};

export default Swipers;