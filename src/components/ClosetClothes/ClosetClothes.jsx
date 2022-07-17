import { React, useState } from 'react';
import ViewCategoryItems from '../ViewCategoryItems/ViewCategoryItems';
import styles from './ClosetClothes.module.css';

const ClosetClothes = () => {
    const [currentCategory, setCurrentCategory] = useState('tops');

    return (
        <div className={styles['closet-clothes-container']}>
            <button
                type="button"
                onClick={() => {
                    console.log('tops');
                    setCurrentCategory('tops');
                    console.log(currentCategory);
                }}
                className={styles['tab-button']}
            >
                Tops
            </button>
            <button
                type="button"
                onClick={() => {
                    console.log('bottoms');
                    setCurrentCategory('bottoms');
                    console.log(currentCategory);
                }}
                className={styles['tab-button']}
            >
                Bottoms
            </button>
            <button
                type="button"
                onClick={() => {
                    console.log('outerwear');
                    setCurrentCategory('outerwear');
                    console.log(currentCategory);
                }}
                className={styles['tab-button-last']}
            >
                Outerwear
            </button>
            <ViewCategoryItems category={currentCategory} />
        </div>
    )
}

export default ClosetClothes;