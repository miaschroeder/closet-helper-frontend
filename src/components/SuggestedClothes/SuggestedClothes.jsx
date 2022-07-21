import React from 'react';
import { PropTypes } from 'prop-types';
import SuggestedCategoryItems from '../SuggestedCategoryItems/SuggestedCategoryItems';
import styles from './SuggestedClothes.module.css'

const SuggestedClothes = ({ weatherCategory, styleFilter, sorted }) => {

    const stringStyleFilter = styleFilter === null ? "none" : styleFilter;

    return (
        <div className={styles['suggested-clothes-container']}>
            <div className={styles['category-label']}>Tops</div>
            <SuggestedCategoryItems
                clothingCategory={'tops'}
                weatherCategory={weatherCategory}
                styleFilter={stringStyleFilter}
                sorted={sorted} 
            />
            <div className={styles['category-label']}>Bottoms</div>
            <SuggestedCategoryItems
                clothingCategory={'bottoms'}
                weatherCategory={weatherCategory}
                styleFilter={stringStyleFilter}
                sorted={sorted}
            />
            <div className={styles['category-label']}>Outerwear</div>
            <SuggestedCategoryItems
                clothingCategory={'outerwear'}
                weatherCategory={weatherCategory}
                styleFilter={stringStyleFilter}
                sorted={sorted}
            />
        </div>
    );
}

SuggestedClothes.propTypes ={
    weatherCategory: PropTypes.string,
    // styleFilter: [ PropTypes.string, PropTypes.null ],
};

export default SuggestedClothes;