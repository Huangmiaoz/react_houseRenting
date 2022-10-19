import React, { useState, useEffect } from 'react'

import { axiosAPI as axios } from '../../../../../utils/axios';
import { getCity, getCurrentCity, useCity } from '../../../../../utils/city.js'
import { Mask } from 'antd-mobile'
import FilterTitle from './FilterTitle';
import FilterPicker from './FilterPicker';
import FilterMore from './FilterMore';
import _ from 'lodash'
import styles from './index.module.css'
const Filter = ({
    filters,
    setFilters,
    placeholder,
    content
}) => {
    // 获取当前城市
    // const [cityValue] = useCity();
    // 设置筛选条件state
    const defaultSelected = {
        area: ['area', 'null', null, null],
        mode: ['null'],
        price: ['null'],
        more: [],
    };
    // 设置标题选中状态和当前标题state
    const initialStatus = {
        area: false,
        mode: false,
        price: false,
        more: false
    };
    // 标题的状态
    const [titleSelectedStatus, setTitleSelectedStatus] = useState(initialStatus);
    // 被选中的值(就是点开选择器,里面默认框住的地方)，默认是defaultSelected
    const [selectedValue, setSelectedValue] = useState(defaultSelected);
    // 打开or关闭的状态,以及当前被点击的是哪个标签
    const [openType, setOpenType] = useState('');
    // 设置筛选条件数据state
    const [filterData, setFilterData] = useState({});
    // 组合筛选条件,因为要父子之间传递，因此直接在父组件中定义即可，然后传递到子组件来，无需再在子组件中定义
    // const [filters,setFilters] = useState({});
    // 获取当前ref对象实例
    const placeholderEl = placeholder.current;
    const contentEl = content.current;
    useEffect(async() => {
        console.log('useEffect--> filter')
        const city =await getCurrentCity();
        console.log(city);
        const getFilterData = async (id) => {
            const result = await axios.get(`/houses/condition?id=${id}`);
            // 设置筛选条件数据
            setFilterData(result.data.body);
        };

        getFilterData(city.value);
    });

    const onTitleClick = (type) => {
        const newTitleSelectedStatus = { ...titleSelectedStatus };
        // 使用lodash判断当前状态和默认状态来返回标题选中状态，更加直观
        // 遍历标题选中状态
        Object.keys(titleSelectedStatus).forEach((key) => {
            // 当前选中项直接返回，不用继续判断
            if (key === type) {
                newTitleSelectedStatus[type] = true;
                // 之前只有点第二次的时候才会高亮
                // 设置选中状态
                setTitleSelectedStatus({ ...newTitleSelectedStatus });
                // 设置选中项
                setOpenType(type);
                return;
            }

            // 对比当前状态和默认状态是否相同，不同则选上
            if (key === 'area') {
                selectedValue[key][0] === 'area'
                    ? _.isEqual(selectedValue[key], defaultSelected[key])
                        ? newTitleSelectedStatus[key] = false
                        : newTitleSelectedStatus[key] = true
                    : selectedValue[key][1] === 'null'
                        ? newTitleSelectedStatus[key] = false
                        : newTitleSelectedStatus[key] = true;
            } else {
                _.isEqual(selectedValue[key], defaultSelected[key])
                    ? newTitleSelectedStatus[key] = false
                    : newTitleSelectedStatus[key] = true;
            }
        })

        // 设置选中状态
        setTitleSelectedStatus({ ...newTitleSelectedStatus });
        // 设置选中项
        setOpenType(type);
    }

    const onCancel = (openType) => {
        const nowSelectedValue = selectedValue[openType];
        const newTitleSelectedStatus = { ...titleSelectedStatus };
        // console.log(nowSelectedValue,defaultSelected[openType]);
        if (openType === 'area') {
            nowSelectedValue[0] === 'area'
                ?( _.isEqual(nowSelectedValue, defaultSelected[openType]) && nowSelectedValue)
                    ? newTitleSelectedStatus[openType] = false
                    : newTitleSelectedStatus[openType] = true
                : nowSelectedValue[1] === 'null'
                    ? newTitleSelectedStatus[openType] = false
                    : newTitleSelectedStatus[openType] = true;
        } else {
            (_.isEqual(nowSelectedValue, defaultSelected[openType]) && nowSelectedValue)
                ? newTitleSelectedStatus[openType] = false
                : newTitleSelectedStatus[openType] = true;
        }
        setOpenType('');
        setTitleSelectedStatus(newTitleSelectedStatus);
    }

    // 设置点击事件：点击确认提交筛选条件
    const onConfirm = (openType, filterValue) => {
        const newTitleSelectedStatus = { ...titleSelectedStatus };
        // 使用lodash判断当前状态和默认状态来返回标题选中状态，更加直观
        // 遍历标题选中状态
        // 对比当前状态和默认状态是否相同，不同则选上
        if (openType === 'area') {
            filterValue[0] === 'area'
                ? _.isEqual(filterValue, defaultSelected[openType])
                    ? newTitleSelectedStatus[openType] = false
                    : newTitleSelectedStatus[openType] = true
                : filterValue[1] === 'null'
                    ? newTitleSelectedStatus[openType] = false
                    : newTitleSelectedStatus[openType] = true;
        } else {
            _.isEqual(filterValue, defaultSelected[openType])
                ? newTitleSelectedStatus[openType] = false
                : newTitleSelectedStatus[openType] = true;
        }
        
        // 更新菜单选项状态
        setTitleSelectedStatus(newTitleSelectedStatus);
        // console.log(newTitleSelectedStatus);

        // 这是被选中的数据----最新选中筛选值状态
        const newSelectedValue = {
            ...selectedValue,
            [openType]: filterValue
        }
        // console.log(newSelectedValue)
        setSelectedValue(newSelectedValue);

        // 解构最新选中筛选值状态
        const { area, mode, price, more } = newSelectedValue;
        console.log(area, mode, price, more);
        const areaKey = area[0];

        let areaValue = null;

        // 判定areaValue的值
        if (areaKey === 'area') {
            area[3] === null
                ? areaValue = area[1]
                : area[3] === 'null'
                    ? areaValue = area[2]
                    : areaValue = area[3];
        } else if (areaKey === 'subway') {
            area[2] === null
                ? areaValue = null
                : area[2] === 'null'
                    ? areaValue = area[1]
                    : areaValue = area[2];
        }

        // 组装筛选条件
        const newFilters = {
            [areaKey]: areaValue,
            rentType: mode[0],
            price: price[0],
            more: more.join(',')
        };
        console.log('newFilters',newFilters)
        // 将筛选条件更新给父组件
        setFilters(newFilters);
        setOpenType('')
        // console.log('filters',filters)

        // 按下确定键进行条件查询后页面回到顶部
        // 获取content实例对象的className
        const fixed = contentEl.className;

        // 当筛选栏被固定时，取消固定并回滚至页面顶部
        if (fixed) {
            window.scrollTo(0, 0);

            // 当回滚至页面顶部时,移除fixed类名,并取消占位符高度
            contentEl.classList.remove(fixed);
            placeholderEl.style.height = `0px`;
        }

    };
    const onClear = () => {
        // 更新筛选条件state
        setSelectedValue((prevValue) => {
            // 创建选中状态备份
            const tempState = {
                ...prevValue
            };

            // 判断并更新选中状态state
            setTitleSelectedStatus((prevStatus) => {
                // 点击确认时判断是否继续高亮标题
                let flag;

                if (openType === 'area') {
                    tempState[openType][0] === 'area'
                        ? _.isEqual(tempState[openType], defaultSelected[openType])
                            ? flag = false
                            : flag = true
                        : tempState[openType][1] === 'null'
                            ? flag = false
                            : flag = true;
                } else {
                    _.isEqual(tempState[openType], defaultSelected[openType])
                        ? flag = false
                        : flag = true;
                }

                return {
                    ...prevStatus,
                    [openType]: flag
                };
            });

            return { ...tempState };
        });

        // 关闭筛选器
        setOpenType('');
    }
    return (
        <>
            <div className={styles.root}>
                <div className={styles.content}>
                    <FilterTitle
                        titleSelectedStatus={titleSelectedStatus}
                        onTitleClick={onTitleClick}
                        // 设定FilterTitle显示层级
                        visible={openType && openType !== 'more' ? 1001 : ''}
                    />
                    <Mask
                        visible={openType
                            ? true
                            : false
                        }
                        opacity={0.5}
                        onMaskClick={() => { onClear() }}
                    >

                        {
                            (openType === 'area' || openType === 'mode' || openType === 'price') ?
                                <FilterPicker
                                    //这是当前点开的标签 
                                    openType={openType}
                                    onCancel={onCancel}
                                    onConfirm={onConfirm}
                                    // 这个是被默认选中的值(就是一点进去被框住居中显示的)
                                    selectedValue={selectedValue}
                                    // 这个是级联选择器中所需要的数据
                                    data={filterData}
                                // contentEl={contentEl}
                                />
                                : <FilterMore
                                    data={filterData}
                                    onConfirm={onConfirm}
                                />
                        }

                    </Mask>
                </div>
            </div>
        </>
    )
}
export default Filter;