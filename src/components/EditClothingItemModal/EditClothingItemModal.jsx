import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import debounce from 'lodash.debounce'
import { Button, Modal, Form, Input, Radio, Switch, message } from 'antd';
// import styles from './CreateClothingItemModal.module.css';
import CHBackend from '../../common/utils';

const EditClothingItemModal = ({ isOpen, setIsOpen, clothingCategory, itemID, closetUpdated, setClosetUpdated }) => {
    const [itemName, setItemName] = useState(null);
    const [editingName] = useState(null);
    const [clothingStyle, setClothingStyle] = useState(null)
    const [weatherCategory, setWeatherCategory] = useState(null)
    const [favorite, setFavorite] = useState(null);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const getItemInfo = async () => {
        // console.log(`api/v1/${clothingCategory}/${itemID}`);
        try{
            const res = await CHBackend.get(`/api/v1/${clothingCategory}/${itemID}`);
            const item = res.data.item;
            const itemTitle = item.name;
            const itemStyle = item.style;
            const itemWeather = item.weather;
            const itemFavorite = item.favorite;
            setItemName(itemTitle);
            setClothingStyle(itemStyle);
            setWeatherCategory(itemWeather);
            setFavorite(itemFavorite);
            console.log('item info', itemName, clothingStyle, weatherCategory, favorite);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItemInfo();
    }, [isOpen]);

    const handleSave = async () => {
        try {
            setConfirmLoading(true);
            const item = await CHBackend.patch(`api/v1/${clothingCategory}/${itemID}`, {
                name: itemName,
                style: clothingStyle,
                weather: weatherCategory,
                favorite
            });
            console.log('saved item', item);
            setConfirmLoading(false);
            setClosetUpdated(closetUpdated + 1)
            setIsOpen(false);
            message.success('Item edited successfully.');
            console.log('saved item name', itemName);
        } catch (err) {
            console.log('error', err);
            setIsOpen(false);
            message.error('Item edit failed.');
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        // resetInputFields();
    };

    const onFinishSuccess = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const InputForm = () => {
        return (
            <div>
                <Input
                    value={itemName}
                    onChange={(e) => {
                        console.log('itemName', itemName);
                        setItemName(e.target.value);}}
                />
                <Radio.Group
                    value={clothingCategory}
                    disabled={true}
                >
                    <Radio value={"tops"}>Tops</Radio>
                    <Radio value={"bottoms"}>Bottoms</Radio>
                    <Radio value={"outerwear"}>Outerwear</Radio>
                </Radio.Group>
                <Radio.Group
                    onChange={(e) => {setClothingStyle(e.target.value)}}
                    value={clothingStyle}
                >
                    <Radio.Button value={"casual"}>Casual</Radio.Button>
                    <Radio.Button value={"business"}>Business</Radio.Button>
                    <Radio.Button value={"active"}>Active</Radio.Button>
                </Radio.Group>
                <Radio.Group
                    onChange={(e) => {setWeatherCategory(e.target.value)}}
                    value={weatherCategory}
                    // defaultValue={"warm"}
                >
                    <Radio value={"hot"}>Hot</Radio>
                    <Radio value={"warm"}>Warm</Radio>
                    <Radio value={"chilly"}>Chilly</Radio>
                    <Radio value={"cold"}>Cold</Radio>
                </Radio.Group>
                <Switch checked={favorite} onChange={(e) => setFavorite(e)}/>
            </div>
        )
    };

    return (
        <Modal
            title="Edit Clothing Item"
            visible={isOpen}
            footer={[
                <Button
                    key="cancel"
                    type="default"
                    loading={false}
                    onClick={handleCancel}
                >Cancel</Button>,
                <Button
                    key="delete"
                    type="default"
                    danger
                >Delete</Button>,
                <Button
                    key="create"
                    type="primary"
                    loading={confirmLoading}
                    onClick={handleSave}
                >Save</Button>
            ]}
        >
            {itemName ? (
                <InputForm />
            ) : null}
        </Modal>
    )

}

EditClothingItemModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    clothingCategory: PropTypes.string,
    itemID: PropTypes.string,
};

export default EditClothingItemModal;