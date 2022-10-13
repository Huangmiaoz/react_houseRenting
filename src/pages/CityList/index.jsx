import { NavBar, Toast } from 'antd-mobile'
import { axiosAPI as axios } from '../../utils/axios.js'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentCity, setCity } from '../../utils/city';
import { List as VList, AutoSizer } from 'react-virtualized'
import  '../css/cityList.css';

export default function CityList() {
  const navigate = useNavigate()
  const cityListComponent = useRef(null);
  const [citylist, setCitylist] = useState({})
  const [cityIndex, setCityIndex] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

  useEffect(() => {
    async function getCity() {
      await getCityLisy();
      try {
        cityListComponent.current.measureAllRows()
      } catch (err) {
        // console.log(err, 'err')
      }
    }
    getCity();
  }, [])

  const TITLE_HEIGHT = 36
  const NAME_HEIGHT = 50

  // 分类数据格式化
  const formatData = list => {
    const citylist = {}
    list.forEach(item => {
      const first = item.short.substr(0, 1);
      if (citylist[first]) {//判断是否存在字母缩写
        citylist[first].push(item)
      } else {
        citylist[first] = [item]
      }
    })
    const cityIndex = Object.keys(citylist).sort()
    return {
      citylist, cityIndex
    }
  }
  //  字母索引格式化
  const formatCityIndex = letter => {
    switch (letter) {
      case '#':
        return '当前定位'
      case 'hot':
        return '热门城市'
      default:
        return letter.toUpperCase()
    }
  }

  // 列表数据：三部分
  const getCityLisy = async () => {
    // 数据1
    const res = await axios.get('/area/city?level=1')
    const { citylist, cityIndex } = formatData(res.data.body)
    // 数据2
    const hotRes = await axios.get('/area/hot')
    citylist['hot'] = hotRes.data.body
    cityIndex.unshift('hot')
    // 数据3
    const curCity = await getCurrentCity()
    citylist['#'] = [curCity]
    cityIndex.unshift('#')
    setCitylist(citylist)
    setCityIndex(cityIndex)
    console.log('城市列表数据：', citylist, cityIndex, curCity)
  }

  // 切换城市
  const changeCity = ({ label, value }) => {
    if (HOUSE_CITY.indexOf(label) > -1) {
      setCity(label)
      navigate(-1)
    } else {
      Toast.show({
        content: '该城市暂无房源数据',
      })
    }
  }
  // 渲染行
  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }) => {
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {citylist[letter].map(item => (
          <div className="name" key={item.value} onClick={() => { changeCity(item) }}>
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  // 行高度
  const getRowHeight = ({ index }) => {
    // 标题高度+子项目个数*子项目高度
    return TITLE_HEIGHT + citylist[cityIndex[index]].length * NAME_HEIGHT
  }

  // 左侧联动右侧：获取startIndex，更新右侧activeIndex
  const rowsRendered = ({ startIndex }) => {
    // console.log(startIndex, 'startIndex右')
    if (activeIndex !== startIndex) {
      setActiveIndex(startIndex)
    }
  }

  // 右侧联动左侧：ref绑定List组件，调用实例方法
  // 问题：渲染过的列表才能精确跳转，提前计算每一行高度来解决
  const renderCityIndex = () => {
    return cityIndex.map((item, index) => (
      <li className="cityIndexItem" key={item} onClick={() => { cityListComponent.current.scrollToRow(index); console.log(index, '左'); setActiveIndex(index) }}>
        <span className={activeIndex === index ? 'indexActive' : ''}>
          {item === 'hot' ? '热' : item.toUpperCase()}
        </span>
      </li>
    ))
  }

  return (
    <>
      <div className='cityList'>
        <NavBar className='navHeader' onBack={() => { navigate(-1) }}>城市选择</NavBar>
        <AutoSizer>
          {({ height, width }) => (//需要设置根元素高度
            <VList
              ref={cityListComponent}
              width={width}
              height={height}
              rowCount={cityIndex.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              onRowsRendered={rowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
        <ul className="cityIndex">{renderCityIndex()}</ul>
      </div>
    </>
  );
}