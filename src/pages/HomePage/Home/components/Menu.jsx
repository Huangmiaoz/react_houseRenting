import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from 'antd-mobile'

import Nav1 from '../../../../asserts/images/nav-1.png';
import Nav2 from '../../../../asserts/images/nav-2.png';
import Nav3 from '../../../../asserts/images/nav-3.png';
import Nav4 from '../../../../asserts/images/nav-4.png';

export default function Menu ()  {
    const menus = [
        {
            id: 1,
            img: Nav1,
            title: '整租',
            path: '/home/search'
        },
        {
            id: 2,
            img: Nav2,
            title: '合租',
            path: '/home/search'
        },
        {
            id: 3,
            img: Nav3,
            title: '地图找房',
            path: '/mappage'
        },
        {
            id: 4,
            img: Nav4,
            title: '去出租',
            path: '/rent/add'
        },
    ]

    const history = useNavigate();

    return (
        <Grid columns={4} gap={8}
            style={{ padding: '10px 0', backgroundColor: '#fff', position: 'relative' }}
        >

            {menus.map((item) => (
                <Grid.Item
                    key={item.id}
                    onClick={() => history(item.path)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <div>
                        <img
                            src={item.img}
                            alt={item.title}
                            style={{ width: '48px' }}
                        />
                        <h2
                            style={{ marginTop: '6px', fontSize: '16px', fontWeight: 'normal' }}
                        >
                            {item.title}
                        </h2>
                    </div>
                </Grid.Item>))
            }
        </Grid>
    )
}