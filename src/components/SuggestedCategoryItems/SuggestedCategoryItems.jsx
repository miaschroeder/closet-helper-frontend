import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Card, List } from 'antd';
import styles from './SuggestedCategoryItems.module.css';
import CHBackend from '../../common/utils';
import ClothingItemCard from '../ClothingItemCard/ClothingItemCard';


const SuggestedCategoryItems = ({ clothingCategory, weatherCategory, styleFilter, sorted }) => {
    const [allItems, setAllItems] = useState();
    const [displayItems, setDisplayItems] = useState();
    const [unsortedDisplayItems, setUnsortedDisplayItems] = useState();
    const [closetUpdated, setClosetUpdated] = useState(0);

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
        setDisplayItems(suggestedItems);
    };

    useEffect(() => {
        getAllItems();
    }, [closetUpdated]);

    useEffect(() => {
        if (!allItems && !styleFilter) {
            console.log('no items or no filter')
            return;
        } else if (styleFilter == null) {
            console.log('no style filter');
            console.log(allItems);
            setDisplayItems(allItems);
        }  else {
            console.log('filter')
            const filteredItems = allItems.filter((item) => {
                return item.style === styleFilter.toLowerCase();
            });
            console.log(filteredItems);
            setDisplayItems(filteredItems);
        }
    }, [styleFilter]);

    useEffect(() => {
        if (!displayItems) {
            return;
        }

        if (sorted) {
            console.log('sorting items');
            const sortedItems = [...displayItems].sort((item1, item2) => {
                if (item1.favorite && !item2.favorite) {
                    return -1;
                } else if (!item1.favorite && item2.favorite) {
                    return 1;
                } else {
                    return 0;
                }
            });
            setUnsortedDisplayItems(displayItems);
            setDisplayItems(sortedItems);
        } else {
            console.log('unsorting items');
            setDisplayItems(unsortedDisplayItems);
        }
    }, [sorted]);

    return (
        <div className={styles['category-container']}>
            { displayItems ? (
                displayItems.map((item) => {
                    return (
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