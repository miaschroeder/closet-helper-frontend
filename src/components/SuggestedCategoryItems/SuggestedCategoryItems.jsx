import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List } from 'antd';
import styles from './SuggestedCategoryItems.module.css';
import CHBackend from '../../common/utils';


const SuggestedCategoryItems = ({ clothingCategory, weatherCategory }) => {
    const [allItems, setAllItems] = useState([]);
    const getAllItems = async () => {
        // console.log('getting category items');
        const items = await CHBackend.get(`/api/v1/${clothingCategory}`);
        // console.log(tops);
        const suggestedItems = items.data.items.filter(item => {
            return item.weather === weatherCategory;
        })
        // setAllItems(items.data.items);
        console.log(weatherCategory)
        console.log(suggestedItems);
        setAllItems(suggestedItems);
    };

    useEffect(() => {
        getAllItems();
    }, []);

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
    clothingCategory: PropTypes.string.isRequired,
    weatherCategory: PropTypes.string.isRequired,
};

export default SuggestedCategoryItems;