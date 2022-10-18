import React, { useState, useEffect } from 'react'

import { axiosAPI as axios } from '../../../../../utils/axios';
import { useCity } from '../../../../../utils/city.js'
import { Mask } from 'antd-mobile'
import FilterTitle from './FilterTitle';
import FilterPicker from './FilterPicker';
import FilterMore from './FilterMore';
import _ from 'lodash'
import styles from './index.module.css'
const Filter = () => {
    // 获取当前城市
    const [cityValue] = useCity();
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
    useEffect(() => {
        const getFilterData = async (id) => {
            const result = await axios.get(`/houses/condition?id=${id}`);
            // 设置筛选条件数据
            setFilterData(result.data.body);
        };

        getFilterData(cityValue);
    }, [cityValue]);

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
        // 这是被选中的
        const newSelectedValue = {
            ...selectedValue,
            [openType]: filterValue
        }
        // console.log(newSelectedValue)
        setSelectedValue(newSelectedValue);
        setOpenType('')
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