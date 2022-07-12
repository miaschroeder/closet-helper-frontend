import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Modal, Form, Input, Radio, Switch } from 'antd';
import styles from './CreateClothingItemModal.module.css';
import CHBackend from '../../common/utils';

const CreateClothingItemModal = ({ isOpen, setIsOpen }) => {   
    const [itemName, setItemName] = useState(''); 
    const [clothingCategory, setClothingCategory] = useState('tops')
    const [clothingStyle, setClothingStyle] = useState('casual')
    const [weatherCategory, setWeatherCategory] = useState('warm')
    const [favorite, setFavorite] = useState(true);
    
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const handleCreate = async () => {
        // console.log(
        //     `name: ${itemName},
        //     category: ${clothingCategory},
        //     style: ${clothingStyle},
        //     weather: ${weatherCategory}`
        // );
        setConfirmLoading(true);
        const item = await CHBackend.post(`api/v1/${clothingCategory}`, {
            name: itemName,
            style: clothingStyle,
            weather: weatherCategory,
            favorite
        });
        console.log(item);
        setConfirmLoading(false);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const onFinishSuccess = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            title="Create Clothing Item"
            visible={isOpen}
            onOk={handleCreate}
            onCancel={handleCancel}
            footer={[
                <Button
                key="cancel"
                type="default"
                loading={false}
                onClick={handleCancel}
                >Cancel</Button>,
                <Button
                    key="create"
                    type="primary"
                    loading={confirmLoading}
                    onClick={handleCreate}
                >Create</Button>
            ]}
        >
            <Form
                name="createItem"
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
                        onChange={(e) => {setClothingCategory(e.target.value)}}
                        value={clothingCategory}
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
    );
};

CreateClothingItemModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
}

export default CreateClothingItemModal;