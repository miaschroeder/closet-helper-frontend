import React from 'react';
import { PropTypes } from 'prop-types';
import SuggestedCategoryItems from '../SuggestedCategoryItems/SuggestedCategoryItems';

const SuggestedClothes = ({ weatherCategory }) => {

    return (
        <div>
            <div>weather {weatherCategory}</div>
            <div>Suggested Tops</div>
            <SuggestedCategoryItems clothingCategory={'tops'} weatherCategory={weatherCategory} />
            <div>Suggested Bottoms</div>
            <SuggestedCategoryItems clothingCategory={'bottoms'} weatherCategory={weatherCategory} />
            <div>Suggested Outerwear</div>
            <SuggestedCategoryItems clothingCategory={'outerwear'} weatherCategory={weatherCategory} />
        </div>
    );
}

SuggestedClothes.propTypes ={
    weatherCategory: PropTypes.string,
};

export default SuggestedClothes;