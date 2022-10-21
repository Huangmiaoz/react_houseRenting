import React, { useEffect, useState } from 'react'
import { getCity } from '../../utils/city'
import MyNavBar from '../../components/MyNavBar/index.jsx';
import '../css/Mappage.css'
import { axiosAPI as axios } from '../../utils/axios.js';
import { BASE_URL } from '../../utils/url.js'
import HouseItems from '../../components/HouseItems/HouseItems';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'antd-mobile';

const MapPage = () => {
  const BMapGL = window.BMapGL;
  // 获取当前的地址信息
  const { value, label } = getCity();
  // 设置小区房源列表和是否显示列表的state
  const [houselist, setHouselist] = useState([]);
  const [isShowList, setIsShowList] = useState(false);

  useEffect(() => {
    const map = new BMapGL.Map('container');
    // console.log(map);

    // 初始化地图，包括地图展示以及比例尺、缩放的控件
    const initMap = () => {
      // 在react脚手架中全局对象要使用window访问
      // 使用地址解析器得到坐标信息,先创建地址解析器实例
      const myGeo = new BMapGL.Geocoder();
      myGeo.getPoint(label, async (point) => {
        if (point) {
          // 设置中心点坐标,传入的是地点的经纬度
          map.centerAndZoom(point, 11);
          // 控件
          map.addControl(new BMapGL.NavigationControl());
          map.addControl(new BMapGL.ScaleControl());
          // 获取房源数据
          renderOverlays(value);
        }
      }, label);
      // 给地图绑定移动事件
      map.addEventListener('movestart',()=>{
        if(isShowList) {
          setIsShowList(false);
        }
      })

      // 根据数据渲染覆盖物
      const renderOverlays = async (id) => {
        // 加载提示
        Toast.show({
          icon: 'loading',
          content: '加载中…',
        });
        const houseResult = await axios.get(`area/map?id=${id}`);
        const houseData = houseResult.data.body;
        console.log(houseData);
        const { nextZoom, type } = getTypeAndZoom(map);
        // console.log(nextZoom,type)
        // 每条数据都赋予一个覆盖物
        houseData.forEach(item => {
          createOverlays(item, nextZoom, type);
        })
        Toast.clear();
      }
      // 根据缩放比例来选择不同的覆盖物类型
      const createOverlays = (data, zoom, type) => {
        const {
          coord: { longitude, latitude },
          label: areaName,
          count,
          value
        } = data;

        const areaPoint = new BMapGL.Point(longitude, latitude);

        if (type === 'rect') {
          createRect(areaPoint, areaName, count, value)

        } else {
          createCircle(areaPoint, areaName, count, value, zoom)

        }
      }

      // 覆盖物
      // Uncaught (in promise) ReferenceError: Cannot access 'opts' before initializa——循环引用，导致webpack编译代码时认为opts还没被定义
      const createCircle = (areaPoint, areaName, count, value, zoom) => {
        const label = new BMapGL.Label('', {
          position: areaPoint,
          offset: new BMapGL.Size(-35, -35)
        })
        // 给每条数据设置一个唯一标识
        label.id = value;

        label.setContent(`
          <div style="
              width: 70px;
              height: 70px;
              line-height: 1;
              display: inline-block;
              position: absolute;
              border-radius: 100%;
              background: rgba(12, 181, 106, 0.9);
              color: #fff;
              border: 2px solid rgba(255, 255, 255, 0.8);
              text-align: center;
              cursor: pointer;
            "
          >
              <p style="padding: 8px 0 0px 0;">${areaName}</p>
              <span>${count}套</span>
              <i ></i>
          </div>
        `);
        label.setStyle(labelStyle);

        // 点击标签时的事件
        label.addEventListener('click', () => {
          // 加载提示
          Toast.show({
            icon: 'loading',
            content: '加载中…',
          });
          // 获取该区域下房源的数据
          renderOverlays(label.id);
          // console.log(label.id);
          // 以点击对象为中心,放大地图
          map.centerAndZoom(areaPoint, zoom);
          console.log('', zoom);
          // 清除当前的覆盖物信息
          map.clearOverlays();
        })

        // 在地图上添加该覆盖物
        map.addOverlay(label)
        Toast.clear();
      }
      const createRect = (areaPoint, areaName, count, value) => {
        const label = new BMapGL.Label('', {
          position: areaPoint,
          offset: new BMapGL.Size(-50, -28)
        })
        // 给每条数据设置一个唯一标识
        label.id = value;

        label.setContent(`
          <div style="
              width: 100px;
              height: 20px;
              line-height: 19px;
              position: absolute;
              border-radius: 3px;
              background: rgba(12, 181, 106, 0.9);
              color: #fff;
              padding:0 3px;
              cursor: pointer;
              white-space:nowrap
            "
          >
              <p style="
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom:1px;
                margin-top: 2px;
                "
              >${areaName}</p>
              <span style="display: inline-block;margin-bottom:1px;margin-top: 2px;">${count}套</span>
              <i style="  
                display: block;
                margin: 3px auto;
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-top-width: 5px;
                border-top-color: rgba(12, 181, 106, 0.9);"></i>
          </div>
        `);
        label.setStyle(labelStyle);

        // 点击标签时的事件
        label.addEventListener('click', async (e) => {
          // 加载提示
          Toast.show({
            icon: 'loading',
            content: '加载中…',
          });
          // 当点击小区标签时，将该位置移到可视区域中间
          console.log(e.domEvent.changedTouches[0])
          const target = e.domEvent.changedTouches[0];

          map.panBy(
            window.innerWidth / 2 - target.clientX,
            (window.innerHeight - 330) / 2 - target.clientY
          );

          getHouseList(label.id);

           // 清除加载提示
          Toast.clear();
        })

        // 在地图上添加该覆盖物
        map.addOverlay(label)
      
      }
    }
    const getHouseList = async (areaId) => {
      const houseResult = await axios.get(`houses?cityId=${areaId}`);
      setHouselist(houseResult.data.body.list);
      setIsShowList(true)
      // console.log('houselist,isShowList',houselist,isShowList);
    }
    initMap();
    // console.log('init zoom', map.getZoom());
  })

  return (
    <>
      {/* 地图元素 */}
      <MyNavBar>地图找房</MyNavBar>
      <div id="container" style={{height: 'calc(100vh - 45px)'}}/>
      <HouseList
        houselist={houselist}
        isShowList={isShowList}
      />
    </>
  )
}

export default MapPage;

const HouseList = ({
  houselist,
  isShowList
}) => {
  const history = useNavigate();
  console.log('houseList in zujian', houselist);
  return (
    <div
      className={`${"houseList"} ${isShowList ? "show" : ''}`}
    >
      <div className='titleWrap'>
        <h1 className='listTitle'>房屋列表</h1>
        <Link
          className='titleMore'
          to="/home/search"
        >
          更多房源
        </Link>
      </div>
      <div className='list_houseItems'>
        { houselist.map((house) => (
          <HouseItems
            key={house.houseCode}
            src={BASE_URL + house.houseImg}
            title={house.title}
            desc={house.desc}
            tags={house.tags}
            price={house.price}
            // styles={styles}
            onClick={() => history(`/detail/${house.houseCode}`)}
          />
        ))}
      </div>
    </div>
  )
}


const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
};

// 获取地图的缩放级别,判断覆盖物的类型----缩放大小确定有些问题，如果是区却显示是镇的话会bug
const getTypeAndZoom = (map) => {
  const zoom = map.getZoom();
  let nextZoom, type;

  if (zoom >= 0 && zoom < 11) {
    nextZoom = 11
    type = 'circle'
  } else if (zoom >= 11 && zoom < 14) {
    nextZoom = 14
    type = 'circle'
  } else if (zoom >= 14 && zoom < 16) {
    nextZoom = 16
    type = 'circle'
  } else {
    nextZoom = 18
    type = 'rect'
  }
  return { nextZoom, type };
}
//计算要绘制的覆盖物类型和下一个缩放级别
//区 ->11，范围:>=10 <12
//镇->13，范围:>=12 <14
//小区 ->15 ，范围: >=14 <16