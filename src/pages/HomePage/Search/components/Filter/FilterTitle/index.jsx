import React from 'react'
import styles from './index.module.css';
import { Grid } from 'antd-mobile'
import {DownOutline} from 'antd-mobile-icons'

export default function FilterTitle({
  titleSelectedStatus,
  onTitleClick
}) {
  const titleList = [
    { title: '区域', type: 'area' },
    { title: '方式', type: 'mode' },
    { title: '租金', type: 'price' },
    { title: '筛选', type: 'more' }
  ];
  
  return (
    // 设定FilterTitle显示层级
    <div
      className={styles.root}
      // style={{ zIndex: visible }}
    >
      <Grid columns={titleList.length} >
        {titleList.map((item) => {
          // 设置是否选中状态
          const isSelected = titleSelectedStatus;

          return (
            <Grid.Item
              key={item.type}
              onClick={() => { onTitleClick(item.type) }}
            >
              <span className={`${styles.dropdown} ${isSelected[item.type] ? styles.selected : ''}`}>
                <span >{item.title}</span>
                <DownOutline />
              </span>
            </Grid.Item>
          );
        })}
      </Grid>
    </div>
  );
};
