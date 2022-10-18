import { Sticky } from 'antd-mobile';
import React , {useRef} from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import MySearchBar from '../../../components/MySearchBar/index.jsx'
import { getCity } from '../../../utils/city.js'
import { useNavigate } from 'react-router-dom';
import Filter from './components/Filter/index.jsx';

const city = getCity();
// console.log(cityName)

export default function Search() {
  const history = useNavigate();
  // 创建Sticky组件ref对象并传递给需要使用的组件
  // const placeholder = useRef();
  const content = useRef();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LeftOutline fontSize={24} style={{ marginTop: '20px', marginLeft: '4px' }} onClick={() => history(-1)} />
        <div style={{ width: '90%', marginTop: '16px' }}>
          <MySearchBar city={city.label} />
        </div>
      </div>
      <Filter/>
      {/* <Sticky
        height={41}
        // placeholder={placeholder}
        content={content}
      >
        <Filter
          filters={filters}
          setFilters={setFilters}
          // placeholder={placeholder}
          content={content}
        /> 
      </Sticky>*/}
      
    </>
  )
}
