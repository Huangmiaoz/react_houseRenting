import { useState, useEffect } from 'react';
import { axiosAPI as axios } from './axios';

const TOKEN_NAME = 'hkzf_city';
// navigator.geolocation.getCurrentPosition((position)=>{console.log(position)})
const getCurrentCity = () => {
    // 获取本地储存中的城市,需要存储当前城市再本地中——还有切换城市的功能
    const localCity = JSON.parse(localStorage.getItem(TOKEN_NAME));
    
    // 本地储存中不存在城市信息时通过定位获取
    if (!localCity) {
        return new Promise((resolve, reject) => {
            // 通过百度地图的api进行定位，拿到城市的名字
            // 如果当前地址没有房源信息，就会返回默认的房源信息
            // 这里采用的是ip定位，根据用户ip返回城市级别的定位结果
            const currentCity = new window.BMapGL.LocalCity();

            currentCity.get(async (res) => {
                try {
                    const result = await axios.get(`/area/info?name=${res.name}`);
                    // 获取到地址信息后，发送请求，将房源信息获取，并存储到本地
                    // console.log('city_home:',result);
                    localStorage.setItem('hkzf_city', JSON.stringify(result.data.body));

                    resolve(result.data.body);
                } catch (e) {
                    reject(e);
                }
            });
        });
    } else {
        return Promise.resolve(localCity);
    }
};

// 获取当前城市的自定义hook
const useCity = () => {
    // 设置当前城市名称和id的state
    const [value, setValue] = useState('');
    const [label, setLabel] = useState('');

    // 挂载时获取当前城市
    useEffect(() => {
        const getCity = async () => {
            const result = await getCurrentCity();

            setValue(result.value);

            setLabel(result.label);
        };

        getCity();
    }, []);

    return [value, label];
};

// 如果当前页面调用getCity但是token丢失，会直接报错，不建议使用
const getCity = () => JSON.parse(localStorage.getItem(TOKEN_NAME));

const setCity = (value) => localStorage.setItem(TOKEN_NAME, value);

export { getCurrentCity, useCity, getCity, setCity };