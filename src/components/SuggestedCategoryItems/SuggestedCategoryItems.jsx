import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List, Empty } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import styles from './SuggestedCategoryItems.module.css';
import CHBackend from '../../common/utils';
import ClothingItemCard from '../ClothingItemCard/ClothingItemCard';


const SuggestedCategoryItems = ({ clothingCategory, weatherCategory, styleFilter, sorted }) => {
    const [allItems, setAllItems] = useState();
    const [closetUpdated, setClosetUpdated] = useState(0);

    const getAllItems = async () => {
        // console.log('getting category items');
        const items = await CHBackend.get(`/api/v1/${clothingCategory}/${styleFilter.toLowerCase()}/${sorted}`);
        // console.log(tops);
        const suggestedItems = items.data.items.filter(item => {
            return item.weather === weatherCategory;
        })
        // setAllItems(items.data.items);
        console.log(weatherCategory)
        console.log(suggestedItems);
        setAllItems(suggestedItems);
        // setDisplayItems(suggestedItems);
    };

    useEffect(() => {
        getAllItems();
    }, [closetUpdated, styleFilter, sorted]);


    return (
        <div className={styles['category-container']}>
            { allItems && allItems.length > 0 ? 
                allItems.map((item) => {
                    return (
                        <div className={styles['item-card']}>
                            <ClothingItemCard
                                itemID={item._id}
                                itemName={item.name}
                                clothingCategory={clothingCategory}
                                styleCategory={item.style}
                                weatherCategory={item.weather}
                                favorite={item.favorite}
                                closetUpdated={closetUpdated}
                                setClosetUpdated={setClosetUpdated}
                            ></ClothingItemCard>
                        </div>
                    )
                }) : (
                    <div className={styles['empty-container']}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                ) }
        </div>
    );
}

SuggestedCategoryItems.propTypes = {
    clothingCategory: PropTypes.string.isRequired,
    weatherCategory: PropTypes.string.isRequired,
};

export default SuggestedCategoryItems;