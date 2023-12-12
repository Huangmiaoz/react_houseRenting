import { Toast, List as AList } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import MySearchBar from '../../../components/MySearchBar/index.jsx'
import { getCity } from '../../../utils/city.js'
import { axiosAPI as axios } from '../../../utils/axios.js';
import { BASE_URL } from '../../../utils/url.js';
import { List as VList, AutoSizer, InfiniteLoader, WindowScroller } from 'react-virtualized'
import { useNavigate } from 'react-router-dom';
import Filter from './components/Filter/index.jsx';
import NoHouse from '../../../components/NoHouse/index.js'
import HouseItems from '../../../components/HouseItems/HouseItems.jsx';
import Sticky from '../../../components/Sticky/index.js';
import styles from './index.module.css'
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

// 结合antd-mobile v5的List组件写法，可以修复react-virtualized无法渲染太多数据的问题
const HouseList = ({
  filters,
  city,
  houselist,
  setHouseList,
  houseCount,
  isLoading
}) => {
  const history = useNavigate();
  // console.log(filters, city, houselist, houseCount, isLoading)
  // 没有找到房源时显示提示页面
  if (houseCount === 0 && !isLoading) {
    return (
      <NoHouse>没有找到房源，请您换个搜索条件吧</NoHouse>
    );
  }

  // 生成列表主函数
  const rowRenderer = ({
    key,
    index,
    style
  }) => {
    const house = houselist[index];

    // 当列表尚未获取到时,先显示占位符
    if (!houselist) {
      return (
        <div
          key={key}
          style={style}
        >
          <p className={styles.loading} />
        </div>
      );
    }

    return (
      <AList.Item
        key={key}
        style={style}
      >
        <HouseItems
          src={BASE_URL + house.houseImg}
          title={house.title}
          desc={house.desc}
          tags={house.tags}
          price={house.price}
          onClick={() => { history(`/detail/${house.houseCode}`) }}
        />
      </AList.Item>
    );
  };

  // InfiniteLoader加载判断函数
  const isRowLoaded = ({ index }) => {
    return !!houselist[index];
  };

  // InfiniteLoader加载函数
  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    const result = await axios.get(`/houses`, {
      params: {
        ...filters,
        cityId: city,
        start: startIndex,
        end: stopIndex
      }
    });

    // 将新获取到的数据合并到原来的房源列表中
    setHouseList((prevList) => [...prevList, ...result.data.body.list]);
  };

  return (
    <AList className={styles.houseList}>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={houseCount}
      >
        {({
          onRowsRendered,
          registerChild
        }) => (
          <WindowScroller>
            {({
              height,
              isScrolling,
              scrollTop
            }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <VList
                    autoHeight // 设置高度为WindowScroller最终渲染的列表高度5
                    ref={registerChild}
                    width={width} // 视口的宽度和高度
                    height={height}
                    rowHeight={130}
                    rowCount={houseCount}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </AList>
  );
};
