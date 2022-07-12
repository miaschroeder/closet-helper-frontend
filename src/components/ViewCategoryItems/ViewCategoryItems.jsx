import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List } from 'antd';
import styles from './ViewCategoryItems.module.css';
import CHBackend from '../../common/utils';


const ViewCategoryItems = ({ category }) => {
    const [allItems, setAllItems] = useState([]);
    const getAllItems = async () => {
        console.log('getting category items');
        console.log(`/api/v1/${category}`);
        try {
            const res = await CHBackend.get(`/api/v1/${category}`);
            console.log(res);
            const clothingItems = res.data.items;
            console.log(clothingItems);
            setAllItems(clothingItems);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);
    // getAllItems();

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
                <Card title={item.name}>
                    <div>{item.weather} weather</div>
                    <div>{item.style}</div>
                    {/* {item.favorite ? <div>favorited</div> : <div></div>} */}
                </Card>
            </List.Item>
            )}
        />
    );
}

ViewCategoryItems.propTypes = {
    category: PropTypes.string.isRequired
};

export default ViewCategoryItems;