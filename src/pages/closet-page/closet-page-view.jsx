import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, SkinOutlined,} from '@ant-design/icons';
import ClosetClothes from '../../components/ClosetClothes/ClosetClothes';
import CreateClothingItemModal from '../../components/CreateClothingItemModal/CreateClothingItemModal';
import styles from './closet-page-view.module.css';

const ClosetPageView = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const { Content, Sider } = Layout;

    return (
        <Layout
        style={{
            minHeight: '100vh',
        }}
        >
            <Sider
                theme="light"
                style={{
                    backgroundColor: '#E4D3C8',
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu
                    theme="light"
                    defaultSelectedKeys={['2']}
                    mode="inline"
                    onClick={(info) => console.log(info)}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to={"/"}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SkinOutlined />}>
                        <Link to={"/closet"}>Closet</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        padding: '0 16px',
                        backgroundColor: '#FBF6F1',
                    }}
                >
                    <div className={'header'}>
                        <div>Here you can view and edit all of your clothes!</div>
                        <button
                            type="button"
                            onClick={() => setCreateModalOpen(true)}
                            className={styles['add-item-button']}
                        >Add Item</button>
                    </div>
                    <CreateClothingItemModal
                        isOpen={createModalOpen}
                        setIsOpen={setCreateModalOpen}
                     />
                    <ClosetClothes />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ClosetPageView;