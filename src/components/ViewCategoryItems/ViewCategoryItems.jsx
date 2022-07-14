import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './ViewCategoryItems.module.css';
import CHBackend from '../../common/utils';
import EditClothingItemModal from '../EditClothingItemModal/EditClothingItemModal';


const ViewCategoryItems = ({ category }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [itemID, setItemID] = useState('');

    const [allItems, setAllItems] = useState([]);
    const getAllItems = async () => {
        // console.log('getting category items');
        // console.log(`/api/v1/${category}`);
        try {
            const res = await CHBackend.get(`/api/v1/${category}`);
            // console.log(res);
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

    return (
        <div>
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
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                                setEditModalOpen(true);
                                setItemID(item._id);
                            }}
                        >
                        </Button>
                        {/* <EditClothingItemModal
                            isOpen={editModalOpen}
                            setIsOpen={setEditModalOpen}
                            itemID={item._id}
                        /> */}
                    </Card>
                </List.Item>
                )}
            />
        <EditClothingItemModal
            isOpen={editModalOpen}
            setIsOpen={setEditModalOpen}
            clothingCategory={category}
            itemID={itemID}
        />
        </div>
    );
}

ViewCategoryItems.propTypes = {
    category: PropTypes.string.isRequired
};

export default ViewCategoryItems;