import React from 'react';
import { PropTypes } from 'prop-types';
import SuggestedCategoryItems from '../SuggestedCategoryItems/SuggestedCategoryItems';
import styles from './SuggestedClothes.module.css'

const SuggestedClothes = ({ weatherCategory }) => {

    return (
        <div className={styles['suggested-clothes-container']}>
            <div className={styles['category-label']}>Tops</div>
            <SuggestedCategoryItems clothingCategory={'tops'} weatherCategory={weatherCategory} />
            <div className={styles['category-label']}>Bottoms</div>
            <SuggestedCategoryItems clothingCategory={'bottoms'} weatherCategory={weatherCategory} />
            <div className={styles['category-label']}>Outerwear</div>
            <SuggestedCategoryItems clothingCategory={'outerwear'} weatherCategory={weatherCategory} />
        </div>
    );
}

SuggestedClothes.propTypes ={
    weatherCategory: PropTypes.string,
};

export default SuggestedClothes;