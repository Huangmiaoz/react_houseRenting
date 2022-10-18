import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Input} from 'antd-mobile'
import { LocationOutline,DownOutline} from 'antd-mobile-icons'
import PropTypes from 'prop-types'
const MySearchBar = ({city}) => {
    const history = useNavigate(); 
    return (
        <div style={{width:'100%',height:'30px',display:'flex',justifyContent: 'space-between'}}>
            <span style={{marginLeft:'10px',marginTop:'5px',fontSize:'16px'}} onClick={() => history('/citylist')}>{city}<DownOutline /></span>
            
            <div
                onClick={() => history('/home/search')}
                style={{backgroundColor:'#fff'}}
            >
               
               <Input placeholder='请输入小区或地址' disabled/>
            </div>
            <LocationOutline style={{marginRight:'18px',marginTop:'5px'}} fontSize={20} onClick={() => history('/mappage')} />
        </div>
    )
}

export default MySearchBar;

MySearchBar.propTypes = {
    city: PropTypes.string.isRequired
};