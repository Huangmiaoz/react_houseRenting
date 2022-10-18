import React, { useState } from 'react'
import { PickerView, CascadePickerView } from 'antd-mobile'
import FilterFooter from '../../../../../../components/FilterFooter';
import styles from './index.module.css'

// 功能一∶点击前三个标题展示该组件，点击取消按钮或空白区域隐藏该组件。
// 功能二∶使用PickerView组低展示筛选条件数据。
// 功能三∶获取到PickerView组件中，选中的筛选条件值。
// 功能四︰点击确定按钮，隐藏该组件，将获取到的筛选条件值传递给父组件。

const FilterPicker = ({
    openType,
    onCancel,
    onConfirm,
    data,
    selectedValue,
    contentEl
}) => {
    // console.log(data)
    // const [province, setProvince] = useState([]);
    // 设置筛选条件state
    const [filterValue, setFilterValue] = useState('');
      // 判断是否显示组件
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
        return null;
    }
    // 因使用了antd-mobile v5的Mask组件作为遮罩层，所以FilterTitle和FilterPicker不在同一级信息流，故需要判断FilterTitle是否被固定，决定顶部margin值达到视觉上FilterPicker紧跟FIlterTitle的效果
    let marginTop;
    // contentEl.className ? marginTop = 0 : marginTop = 86;
    // 接收并判断选择器数据源
    let options = [];

    switch (openType) {
        case 'area':
            options = [data.area, data.subway];
            break;
        case 'mode':
            options = data.rentType;
            break;
        case 'price':
            options = data.price;
            break;
        default:
            break;
    }
    // console.log(options,openType)
    return (
        <div
            className={styles.root}
        // style={{ marginTop: marginTop }}
        >
            <CascadePickerView 
                key={openType}
                options={options}
                // 注意设置组件默认的值为被选中的项,不然不会有切换的效果
                defaultValue={selectedValue[openType]}
                // 保存当前筛选条件
                onChange={(val) => setFilterValue(val)}
            />
            

            <FilterFooter
                cancelText = '取消'
                confirmText = '确定'
                onCancel={()=>onCancel(openType)}
                onConfirm={() => onConfirm(openType,filterValue)}
            />
        </div>
    );
}

export default FilterPicker;