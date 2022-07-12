import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List } from 'antd';
import styles from './SuggestedCategoryItems.module.css';
import CHBackend from '../../common/utils';


const SuggestedCategoryItems = ({ category }) => {
    const [allItems, setAllItems] = useState([]);
    const getAllItems = async () => {
        // console.log('getting category items');
        const items = await CHBackend.get(`/api/v1/${category}`);
        // console.log(tops);
        setAllItems(items.data.items);
    };
    getAllItems();

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
            dataSource={allItems}
            renderItem={(item) => (
            <List.Item>
                <Card title={item.name}>{item.style}</Card>
            </List.Item>
            )}
        />
    );
}

SuggestedCategoryItems.propTypes = {
    category: PropTypes.string.isRequired
};

export default SuggestedCategoryItems;