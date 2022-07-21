import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Modal, Form, Input, Radio, Switch } from 'antd';
import styles from './CreateClothingItemModal.module.css';
import CHBackend from '../../common/utils';

const CreateClothingItemModal = ({ isOpen, setIsOpen, closetUpdated, setClosetUpdated }) => {   
    const [itemName, setItemName] = useState(''); 
    const [clothingCategory, setClothingCategory] = useState('')
    const [clothingStyle, setClothingStyle] = useState('')
    const [weatherCategory, setWeatherCategory] = useState('')
    const [favorite, setFavorite] = useState(false);
    
    const [confirmLoading, setConfirmLoading] = useState(false);

    const resetInputFields = () => {
        setItemName('');
        setClothingCategory('');
        setClothingStyle('');
        setWeatherCategory('');
        setFavorite(false);
        // console.log(itemName);
    }
    
    const handleCreate = async () => {
        setConfirmLoading(true);
        const item = await CHBackend.post(`api/v1/${clothingCategory}`, {
            name: itemName,
            style: clothingStyle,
            weather: weatherCategory,
            favorite
        });
        console.log(item);
        setConfirmLoading(false);
        resetInputFields();
        // setClothingCategory('bottoms');
        setClosetUpdated(closetUpdated + 1);
        setIsOpen(false);
        console.log(itemName);
    };

    const handleCancel = () => {
        setIsOpen(false);
        resetInputFields();
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
            // style={{
            //     backgroundColor: 'white',
            // }}
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
    );
};

CreateClothingItemModal.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    closetUpdated: PropTypes.number,
    setClosetUpdated: PropTypes.func,
};

export default CreateClothingItemModal;