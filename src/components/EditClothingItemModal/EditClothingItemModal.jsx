import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Modal, Form, Input, Radio, Switch, message, Divider, Select } from 'antd';
import styles from './EditClothingItemModal.module.css';
import CHBackend from '../../common/utils';

const EditClothingItemModal = ({ isOpen, setIsOpen, clothingCategory, itemID, closetUpdated, setClosetUpdated }) => {
    const [itemName, setItemName] = useState(null);
    const [clothingStyle, setClothingStyle] = useState(null)
    const [weatherCategory, setWeatherCategory] = useState(null)
    const [favorite, setFavorite] = useState(null);

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select;

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
            message.success(`Item "${itemName}" edited successfully.`);
            console.log('saved item name', itemName);
        } catch (err) {
            console.log('error', err);
            setIsOpen(false);
            message.error('Item edit failed.');
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleDelete = async () => {
        try {
            setConfirmLoading(true);
            const item = await CHBackend.delete(`api/v1/${clothingCategory}/${itemID}`);
            console.log('deleted item', item);
            setConfirmLoading(false);
            setClosetUpdated(closetUpdated + 1)
            setIsOpen(false);
            message.success(`Item "${itemName}" deleted successfully.`);
            console.log('saved item name', itemName);
        } catch (err) {
            console.log('error', err);
            setIsOpen(false);
            message.error('Item deletion failed.');
        }
    }

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal
            title="Edit Clothing Item"
            visible={isOpen}
            closable={true}
            maskClosable={true}
            footer={null}
        >
            <Form
                name="createItem"
                form={form}
                onFinish={handleSave}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    name: itemName,
                    collection: clothingCategory,
                    style: clothingStyle,
                    weather: weatherCategory,
                    favorite: favorite
                }}
            >
                <Form.Item
                    label="Name"
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
                        placeholder="What should we call this item?"
                    />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="collection"
                    rules={[
                        {
                            required: true,
                            message: "Make sure to pick a clothing category!",
                        }
                    ]}
                >
                    <Select placeholder="Where should this go in your closet?">
                        <Option value="tops">Tops</Option>
                        <Option value="bottoms">Bottoms</Option>
                        <Option value="outerwear">Outerwear</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Style"
                    name="style"
                    rules={[
                        {
                            required: true,
                            message: "Make sure to pick a clothing style!",
                        }
                    ]}
                >
                    <Select placeholder="What kind of adventures is this item made for?">
                        <Option value="casual">Casual</Option>
                        <Option value="business">Business</Option>
                        <Option value="active">Active</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Weather"
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
                <Divider />
                <div className={styles['modal-footer']}>
                    <Form.Item className={styles['form-item-cancel']}>
                        <Button type="default" onClick={() => {handleCancel()}}>Cancel</Button>
                    </Form.Item>
                    <Form.Item className={styles['form-item-delete']}>
                        <Button type="default" danger onClick={() => {handleDelete()}}>Delete</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </div>
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