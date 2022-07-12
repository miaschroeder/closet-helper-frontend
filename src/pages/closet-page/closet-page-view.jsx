import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Tabs, Button } from 'antd';
import { HomeOutlined, SkinOutlined,} from '@ant-design/icons';
import ViewCategoryItems from '../../components/ViewCategoryItems/ViewCategoryItems';
import CreateClothingItemModal from '../../components/CreateClothingItemModal/CreateClothingItemModal';

const ClosetPageView = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const { TabPane } = Tabs;
    const { Content, Footer, Sider } = Layout;

    return (
        <Layout
        style={{
            minHeight: '100vh',
        }}
        >
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
                    margin: '0 16px',
                }}
                >
                    <h1>
                        Closet Page View.
                    </h1>
                    <div>Here you can view and edit all of your clothes!</div>
                    <Button type="primary" onClick={() => setCreateModalOpen(true)}>Add New Clothing Item</Button>
                    <CreateClothingItemModal
                        isOpen={createModalOpen}
                        setIsOpen={setCreateModalOpen}
                     />
                    <Tabs onChange={(key) => console.log(key)} type="card">
                        <TabPane tab="Tops" key="1">
                            <ViewCategoryItems category={"tops"} />
                        </TabPane>
                        <TabPane tab="Bottoms" key="2">
                            <ViewCategoryItems category={"bottoms"} />
                        </TabPane>
                        <TabPane tab="Outerwear" key="3">
                        <ViewCategoryItems category={"outerwear"} />
                        </TabPane>
                    </Tabs>
                </Content>
                <Footer
                style={{
                    textAlign: 'center',
                }}
                >
                Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default ClosetPageView;