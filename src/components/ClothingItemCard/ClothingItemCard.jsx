import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { EditOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Card, Button } from 'antd';
import EditClothingItemModal from '../EditClothingItemModal/EditClothingItemModal';
import styles from './ClothingItemCard.module.css';

const ClothingItemCard = ({
    itemID,
    itemName,
    clothingCategory,
    styleCategory,
    weatherCategory,
    favorite,
    closetUpdated, setClosetUpdated,
}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    // const [itemID, setItemID] = useState('');

    return (
        <div>

            <Card
                className={styles['card-container']}
                size="small"
                actions={[
                    <div>
                        {favorite ? <HeartFilled /> : <HeartOutlined />}
                    </div>,
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditModalOpen(true);
                        }}
                        type="text"
                    >
                    </Button>
                ]}
                bordered={true}
            >{itemName}
            </Card>
            <EditClothingItemModal
                isOpen={editModalOpen}
                setIsOpen={setEditModalOpen}
                clothingCategory={clothingCategory}
                itemID={itemID}
                closetUpdated={closetUpdated}
                setClosetUpdated={setClosetUpdated}
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
    closetUpdated: PropTypes.number,
    setClothingCategory: PropTypes.func,
};

export default ClothingItemCard;