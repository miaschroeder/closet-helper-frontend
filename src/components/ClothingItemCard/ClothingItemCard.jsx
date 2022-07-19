import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
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
        // <Card
        //     title={<div className={styles['title']}>{itemName}</div>}
        //     className={styles['card-container']}
        // >
        //     <div className={styles['details-container']}>
        //         <div className={styles['category-container']}>{styleCategory}</div>
        //         <div>
        //             <div styles={styles['edit-button-container']}>
        //                 <Button
        //                     icon={<EditOutlined />}
        //                     onClick={() => {setEditModalOpen(true)}}
        //                     type="text"
        //                     // styles={styles['edit-button']}
        //                     size="medium"
        //                 >
        //                 </Button>
        //             </div>
        //         </div>
        //     </div>
        //         <EditClothingItemModal
        //             isOpen={editModalOpen}
        //             setIsOpen={setEditModalOpen}
        //             clothingCategory={clothingCategory}
        //             itemID={itemID}
        //         />
        // </Card>
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