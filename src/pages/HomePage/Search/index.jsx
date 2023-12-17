import { Toast } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import MySearchBar from '../../../components/MySearchBar/index.jsx'
import { getCity } from '../../../utils/city.js'
import { axiosAPI as axios } from '../../../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import HouseList from './components/HouseList/HouseList.jsx'
import Filter from './components/Filter/index.jsx';
import NoHouse from '../../../components/NoHouse/index.js'
import Sticky from '../../../components/Sticky/index.js';
const city = getCity();
const cityValue = city ? city.value : '';

const Search = () => {
  const history = useNavigate();

  // 保存子组件中的筛选数据
  // 设置筛选条件state
  const [filters, setFilters] = useState({});
  // 房屋列表数据
  const [houselist, setHouseList] = useState([]);
  // 房屋列表总条数
  const [houseCount, setHouseCount] = useState(0);
  const [isLoading, setIsLoading] = useState('');

  // 创建Sticky组件ref对象并传递给需要使用的组件
  const placeholder = useRef();
  const content = useRef();

  useEffect(() => {
    const getHouseList = async (filters, cityValue) => {
      // 加载提示
      setIsLoading(true);
      Toast.show({
        icon: 'loading',
        content: '加载中…',
      });

      // 获取房源信息
      const result = await axios.get(`/houses`, {
        params: {
          cityId: cityValue,
          ...filters,
          start: 1,
          end: 20
        }
      });
      console.log(result);

      // 更新房源列表和房源数量
      setHouseList(result.data.body.list);
      setHouseCount(result.data.body.count);
      // 更新加载状态
      setIsLoading(false);
      // 清除加载提示
      Toast.clear();

      // 当房源多于0套时，显示找到房源提示
      if (result.data.body.count > 0) {
        Toast.show({
          icon: 'success',
          content: `已找到${result.data.body.count}套房源`,
        });
      }
    }

    getHouseList(filters, cityValue);

    return () => {
      // 卸载组件时重新更新加载状态，防止内存泄漏
      setIsLoading(true);
    };
  }, [cityValue, filters]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LeftOutline fontSize={24} style={{ marginTop: '20px', marginLeft: '4px' }} onClick={() => history(-1)} />
        <div style={{ width: '90%', marginTop: '16px' }}>
          <MySearchBar city={city.label} />
        </div>
      </div>
      <Sticky
        height={41}
        placeholder={placeholder}
        content={content}
      >
        <Filter
          filters={filters}
          setFilters={setFilters}
          placeholder={placeholder}
          content={content}
        />
      </Sticky>
      <HouseList
        filters={filters}
        city={cityValue}
        houselist={houselist}
        setHouseList={setHouseList}
        houseCount={houseCount}
        isLoading={isLoading}
      />

    </>
  )
};
export default Search;

