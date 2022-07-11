import React from 'react';
// import { Card, List } from 'antd';
import SuggestedTopsComponent from '../suggestedTopsComponent/SuggestedTopsComponent';
import SuggestedBottomsComponent from '../suggestedBottomsComponent/SuggestedBottomsComponent';
import SuggestedOuterwearComponent from '../suggestedOuterwearComponent/SuggestedOuterwearComponent';

const SuggestedClothesComponent = () => {

    return (
        <div>
            <div>Suggested Tops</div>
            <SuggestedTopsComponent />
            <div>Suggested Bottoms</div>
            <SuggestedBottomsComponent />
            <div>Suggested Outerwear</div>
            <SuggestedOuterwearComponent />
        </div>
    );
}

export default SuggestedClothesComponent;