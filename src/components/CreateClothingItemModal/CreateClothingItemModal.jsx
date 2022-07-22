import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Modal, Form, Input, Radio, Switch, message, Divider, Select } from 'antd';
import styles from './CreateClothingItemModal.module.css';
import CHBackend from '../../common/utils';

const CreateClothingItemModal = ({ isOpen, setIsOpen, closetUpdated, setClosetUpdated }) => {   
    const [itemName, setItemName] = useState(''); 
    // const [clothingCategory, setClothingCategory] = useState('')
    // const [clothingStyle, setClothingStyle] = useState('')
    const [weatherCategory, setWeatherCategory] = useState('')
    const [favorite, setFavorite] = useState(false);
    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select;
    
    const handleCreate = async ( formValues ) => {
        try {
            setConfirmLoading(true);
            console.log('creating item at', `api/v1/${formValues.collection}`);
            const item = await CHBackend.post(`api/v1/${formValues.collection}`, {
                name: formValues.name,
                style: formValues.style,
                weather: formValues.weather,
                favorite: formValues.favorite === undefined ? false : formValues.favorite,
            });
            console.log(item);
            setConfirmLoading(false);
            // resetInputFields();
            // setClothingCategory('bottoms');
            setClosetUpdated(closetUpdated + 1);
            setIsOpen(false);
            message.success(`Item "${formValues.name}" created successfully.`);
            console.log(itemName);
        } catch (err) {
            setIsOpen(false);
            message.error('Item creation failed.')
            console.log(err);
        } finally {
            form.resetFields();
            setFavorite(false);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        setFavorite(false);
    };

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Modal
            title="Create Clothing Item"
            visible={isOpen}
            closable={true}
            maskClosable={true}
            footer={null}
        >
            <Form
                name="createItem"
                form={form}
                onFinish={handleCreate}
                onFinishFailed={onFinishFailed}
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
                    <Form.Item className={styles['form-item-create']}>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </Form.Item>
                </div>
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