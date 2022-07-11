import { React, useState } from 'react';
import { Card, List } from 'antd';
import styles from './SuggestedBottomsComponent.module.css';
import CHBackend from '../../common/utils';


const SuggestedBottomsComponent = () => {
    const [allBottoms, setAllBottoms] = useState([]);
    const getAllBottoms = async () => {
        // console.log('getting bottoms');
        const bottoms = await CHBackend.get('/api/v1/bottoms');
        // console.log(tops);
        setAllBottoms(bottoms.data.items);
    };
    getAllBottoms();

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
            dataSource={allBottoms}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.name}>{item.style}</Card>
            </List.Item>
            )}
        />
    );
}

export default SuggestedBottomsComponent;