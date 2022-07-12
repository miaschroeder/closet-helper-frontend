import React from 'react';
// import { Card, List } from 'antd';
// import SuggestedTopsComponent from '../SuggestedTops/SuggestedTopsComponent';
// import SuggestedBottomsComponent from '../suggestedBottomsComponent/SuggestedBottomsComponent';
// import SuggestedOuterwearComponent from '../SuggestedOuterwear/SuggestedOuterwearComponent';
import SuggestedCategoryItems from '../SuggestedCategoryItems/SuggestedCategoryItems';

const SuggestedClothes = () => {

    return (
        <div>
            <div>Suggested Tops</div>
            <SuggestedCategoryItems category={'tops'} />
            <div>Suggested Bottoms</div>
            <SuggestedCategoryItems category={'bottoms'} />
            <div>Suggested Outerwear</div>
            <SuggestedCategoryItems category={'outerwear'} />
        </div>
    );
}

export default SuggestedClothes;