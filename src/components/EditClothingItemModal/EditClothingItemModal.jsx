import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Modal, Form, Input, Radio, Switch } from 'antd';
// import styles from './CreateClothingItemModal.module.css';
import CHBackend from '../../common/utils';

const EditClothingItemModal = ({ isOpen, setIsOpen, clothingCategory, itemID }) => {
    const [itemName, setItemName] = useState(''); 
    const [clothingStyle, setClothingStyle] = useState('')
    const [weatherCategory, setWeatherCategory] = useState('')
    const [favorite, setFavorite] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const getItemInfo = async () => {
        // console.log(`api/v1/${clothingCategory}/${itemID}`);
        try{
            const res = await CHBackend.get(`/api/v1/${clothingCategory}/${itemID}`);
            const item = res.data.item;
            console.log(item);
            console.log('before', itemName, clothingStyle, weatherCategory, favorite);
            console.log(item.name);
            setItemName(item.name);
            setClothingStyle(item.style);
            setWeatherCategory(item.weather);
            setFavorite(item.favorite);
            console.log('after', itemName, clothingStyle, weatherCategory, favorite);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItemInfo();
    }, [isOpen]);

    const handleEdit = async () => {
        setConfirmLoading(true);
        const item = await CHBackend.post(`api/v1/`, {
            name: itemName,
            style: clothingStyle,
            weather: weatherCategory,
            favorite
        });
        console.log(item);
        setConfirmLoading(false);
        setIsOpen(false);
        console.log(itemName);
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
                    onClick={handleEdit}
                >Save</Button>
            ]}
        >
            <Form
                name="editItem"
                onFinish={onFinishSuccess}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Item Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Make sure to enter a name!",
                        }
                    ]}
                >
                    <Input
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Clothing Category"
                    name="collection"
                    rules={[
                        {
                            required: true,
                            message: "Make sure to pick a clothing category!",
                        }
                    ]}
                >
                    <Radio.Group
                        // onChange={(e) => {setClothingCategory(e.target.value)}}
                        value={'tops'}
                        disabled={true}
                        // defaultValue={"tops"}
                    >
                        <Radio value={"tops"}>Tops</Radio>
                        <Radio value={"bottoms"}>Bottoms</Radio>
                        <Radio value={"outerwear"}>Outerwear</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Clothing Style"
                    name="style"
                    rules={[
                        {
                            required: true,
                            message: "Make sure to pick a clothing style!",
                        }
                    ]}
                >
                    <Radio.Group
                        onChange={(e) => {setClothingStyle(e.target.value)}}
                        value={clothingStyle}
                        // defaultValue={"casual"}
                    >
                        <Radio value={"casual"}>Casual</Radio>
                        <Radio value={"business"}>Business</Radio>
                        <Radio value={"active"}>Active</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Weather Category"
                    name="weather"
                    rules={[
                        {
                            required: true,
                            message: "Make sure to pick a weather category!",
                        }
                    ]}
                >
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
                </Form.Item>
                <Form.Item label="Favorite" name="favorite">
                    <Switch checked={favorite} onChange={(e) => setFavorite(e)}/>
                </Form.Item>
            </Form>
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