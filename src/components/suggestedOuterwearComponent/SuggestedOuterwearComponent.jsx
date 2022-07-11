import { React, useState } from 'react';
import { Card, List } from 'antd';
import styles from './SuggestedOuterwearComponent.module.css';
import CHBackend from '../../common/utils';


const SuggestedOuterwearComponent = () => {
    const [allOuterwear, setAllOuterwear] = useState([]);
    const getAllOuterwear = async () => {
        // console.log('getting bottoms');
        const outerwear = await CHBackend.get('/api/v1/outerwear');
        // console.log(tops);
        setAllOuterwear(outerwear.data.items);
    };
    getAllOuterwear();

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
            dataSource={allOuterwear}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.name}>{item.style}</Card>
            </List.Item>
            )}
        />
    );
}

export default SuggestedOuterwearComponent;