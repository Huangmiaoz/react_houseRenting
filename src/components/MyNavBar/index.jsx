import React from 'react'
import {NavBar} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export default function MyNavBar({
  children,
}) {
  const navigate = useNavigate();
  return (
    <NavBar 
        style={{backgroundColor: '#f5f6f5'}} 
        onBack={() => { navigate(-1) }}
    >
        {children}
    </NavBar>
  )
}

MyNavBar.propTypes = {
    children : PropTypes.string.isRequired,
    onBack : PropTypes.func,
    style : PropTypes.object
}

// Typo in static class property declaration 静态类属性声明中的输入错误 propTypes 大小写
// Typo in prop type chain qualifier: required 就是required写错了，应该是isRequired