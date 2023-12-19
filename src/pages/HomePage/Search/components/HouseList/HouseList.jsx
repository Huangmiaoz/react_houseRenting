import React from 'react'
import { List as AList } from 'antd-mobile';
import { axiosAPI as axios } from '../../../../../utils/axios.js';
import { BASE_URL } from '../../../../../utils/url.js';
import { List as VList, AutoSizer, InfiniteLoader, WindowScroller } from 'react-virtualized'
import { useNavigate } from 'react-router-dom';
import HouseItems from '../../../../../components/HouseItems/HouseItems.jsx';
import NoHouse from '../../../../../components/NoHouse/index.js';
import styles from '../../index.module.less'
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

export default HouseList;
