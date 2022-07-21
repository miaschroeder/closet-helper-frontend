import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
// import { Card, List, Button } from 'antd';
// import { EditOutlined } from '@ant-design/icons';
import styles from './ViewCategoryItems.module.css';
import CHBackend from '../../common/utils';
// import EditClothingItemModal from '../EditClothingItemModal/EditClothingItemModal';
import ClothingItemCard from '../ClothingItemCard/ClothingItemCard';


const ViewCategoryItems = ({ category, closetUpdated, setClosetUpdated }) => {
    // const [editModalOpen, setEditModalOpen] = useState(false);
    // const [itemID, setItemID] = useState('');

    const [allItems, setAllItems] = useState();
    const getAllItems = async () => {
        console.log('getting category items', category);
        // console.log(`/api/v1/${category}`);
        try {
            const res = await CHBackend.get(`/api/v1/${category}/none/false`);
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
    }, [category, closetUpdated]);

    return (
        <div className={styles['category-container']}>
            { allItems ? (
                allItems.map((item) => {
                    return (
                        <ClothingItemCard
                            itemID={item._id}
                            itemName={item.name}
                            clothingCategory={category}
                            styleCategory={item.style}
                            weatherCategory={item.weather}
                            favorite={item.favorite}
                            closetUpdated={closetUpdated}
                            setClosetUpdated={setClosetUpdated}
                        ></ClothingItemCard>
                    )
                })
            ) : null }
        </div>
    );
}

ViewCategoryItems.propTypes = {
    category: PropTypes.string.isRequired,
    closetUpdated: PropTypes.number.isRequired,
    setClosetUpdated: PropTypes.func.isRequired,
};

export default ViewCategoryItems;