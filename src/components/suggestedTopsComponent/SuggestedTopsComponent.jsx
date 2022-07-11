import { React, useState } from 'react';
import { Card, List } from 'antd';
import styles from './SuggestedTopsComponent.module.css';
import CHBackend from '../../common/utils';


const SuggestedTopsComponent = () => {
    const [allTops, setAllTops] = useState([]);
    const getAllTops = async () => {
        // console.log('getting tops');
        const tops = await CHBackend.get('/api/v1/tops');
        console.log(tops);
        setAllTops(tops.data.items);
    };
    getAllTops();

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
            dataSource={allTops}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.name}>{item.style}</Card>
            </List.Item>
            )}
        />
    );
}

export default SuggestedTopsComponent;