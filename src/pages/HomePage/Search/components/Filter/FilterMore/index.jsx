import Item from 'antd-mobile/es/components/dropdown/item'
import React, { useState } from 'react'
import FilterFooter from '../../../../../../components/FilterFooter'
import styles from './index.module.css'
const FilterMore = ({
  openType,
  // onCancel,
  onConfirm,
  setSelectedValue,
  setTitleSelectedStatus,
  defaultValue,
  data: { roomType, oriented, floor, characteristic }
}) => {
  // 被选中的标签
  const [moreSelectedValues,setMoreSelectedValues] = useState([]);
  const onTagClick = (value) => {
    // 创建被点击筛选tag的备份
    let newSelectedValues = [...moreSelectedValues];

    // 判断tag是否已被点击，如没有，则加入被点击条件state数组最后；如已有，则移出被点击条件state
    if (moreSelectedValues.indexOf(value) === -1) {
      newSelectedValues.push(value);
    } else {
      const index = moreSelectedValues.indexOf(value)
      newSelectedValues.splice(index, 1);
    }

    // 更新被点击筛选tag的state
    setMoreSelectedValues([...newSelectedValues]);
  }
  const renderFilters = (data) => {
    return data.map(item => {
      // 判断当前tag是否被选中
      let isSelected = moreSelectedValues.indexOf(item.value);
      return (
        <span
          key={item.value}
          onClick={() => onTagClick(item.value)}
          className={`
            ${styles.tag}
            // 判断tag是否被选中
            ${isSelected === -1
              ? ''
              : styles.tagActive}
          `}
        >{item.label}</span>
      );
    });
  };
  // // 清除所有已经被选的
  const onCancel = ()=>{
    setMoreSelectedValues([]);
  }
  return (
    <div className={styles.root}>
      <div className={styles.tags}>
        <dl className={styles.dl}>
          <dt className={styles.dt}>户型</dt>
          <dd className={styles.dd}>{renderFilters(roomType)}</dd>
          <dt className={styles.dt}>朝向</dt>
          <dd className={styles.dd}>{renderFilters(oriented)}</dd>
          <dt className={styles.dt}>楼层</dt>
          <dd className={styles.dd}>{renderFilters(floor)}</dd>
          <dt className={styles.dt}>房屋亮点</dt>
          <dd className={styles.dd}>{renderFilters(characteristic)}</dd>
        </dl>
      </div>
      <div className={styles.footer}>
        <FilterFooter
          cancelText = "清除"
          onCancel = {onCancel}
          onConfirm={() => onConfirm(openType,moreSelectedValues)}
        />
      </div>
    </div>
  );
}

export default FilterMore;