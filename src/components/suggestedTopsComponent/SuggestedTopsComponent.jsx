import { React, useState, useEffect } from 'react';
import { Card, List } from 'antd';
import styles from './SuggestedTopsComponent.module.css';
import CHBackend from '../../common/utils';


const SuggestedTopsComponent = () => {
    const [allTops, setAllTops] = useState();
    const getAllTops = async () => {
        const tops = await CHBackend.get('/api/v1/tops');
        console.log(tops);
    };
    getAllTops();
    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4'
        },
    ];

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
            dataSource={data}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.title}>Card content</Card>
            </List.Item>
            )}
        />
    );
}

export default SuggestedTopsComponent;