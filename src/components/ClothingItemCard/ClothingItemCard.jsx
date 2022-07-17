import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
import EditClothingItemModal from '../EditClothingItemModal/EditClothingItemModal';
import styles from './ClothingItemCard.module.css';

const ClothingItemCard = ({
    itemID,
    itemName,
    clothingCategory,
    styleCategory,
    weatherCategory,
    favorite
}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    // const [itemID, setItemID] = useState('');

    return (
        <div className={styles['card-container']}>
            <div className={styles['item-name']}>{itemName}</div>
            <div className={styles['details-container']}>
                <div className={styles['category-container']}><i>{styleCategory}</i></div>
                <button
                    type="button"
                    onClick={() => {
                        setEditModalOpen(true);
                    }}
                    className={styles['edit-button']}
                >
                    <EditOutlined />
                </button>
            </div>
            <EditClothingItemModal
            isOpen={editModalOpen}
            setIsOpen={setEditModalOpen}
            clothingCategory={clothingCategory}
            itemID={itemID}
        />
        </div>
    );
};

ClothingItemCard.propTypes = {
    itemID: PropTypes.string,
    itemName: PropTypes.string,
    clothingCategory: PropTypes.string,
    styleCategory: PropTypes.string,
    weatherCategory: PropTypes.string,
    favorite: PropTypes.bool,
};

export default ClothingItemCard;