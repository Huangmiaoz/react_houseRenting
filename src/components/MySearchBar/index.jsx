import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Input, NavBar} from 'antd-mobile'
import { LocationOutline,DownOutline } from 'antd-mobile-icons'
import PropTypes from 'prop-types'
const MySearchBar = ({city}) => {
    const history = useNavigate(); 
    const location = useLocation();

    const pathname = location.pathname;
    const arrow_show = pathname === '/home' ? true : false;

    const right = (
        <LocationOutline 
            // style={{marginRight:'18px',marginTop:'5px'}} 
            fontSize={20} 
            onClick={() => history('/mappage')} 
        />
      )

    const left = (
        <span 
            // style={{marginLeft:'10px',margin:'10px',fontSize:'16px'}} 
            onClick={() => history('/citylist')}
        >
            {city}
            <DownOutline />
        </span>
      )    
    
    const middle = (
            <div
                onClick={() => history('/home/search')}
            >
                <Input placeholder='请输入小区或地址' disabled/>
            </div>
        )
    return (       
        <div>
            <NavBar right={right} left={arrow_show ? left : null} backArrow={null} onBack={() => { history(-1) }}>
                {middle}
            </NavBar>
        </div>
    )
}

export default MySearchBar;

MySearchBar.propTypes = {
    city: PropTypes.string.isRequired
};