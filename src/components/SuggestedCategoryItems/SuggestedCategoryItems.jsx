import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List } from 'antd';
import styles from './SuggestedCategoryItems.module.css';
import CHBackend from '../../common/utils';
import ClothingItemCard from '../ClothingItemCard/ClothingItemCard';


const SuggestedCategoryItems = ({ clothingCategory, weatherCategory }) => {
    const [allItems, setAllItems] = useState();

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
        <div className={styles['category-container']}>
            { allItems ? (
                allItems.map((item) => {
                    return (
                        <ClothingItemCard
                            itemID={item._id}
                            itemName={item.name}
                            clothingCategory={clothingCategory}
                            styleCategory={item.style}
                            weatherCategory={item.weather}
                            favorite={item.favorite}
                        ></ClothingItemCard>
                    )
                })
            ) : null }
        </div>
    );
}

SuggestedCategoryItems.propTypes = {
    clothingCategory: PropTypes.string.isRequired,
    weatherCategory: PropTypes.string.isRequired,
};

export default SuggestedCategoryItems;