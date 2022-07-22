import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Tabs, Button, Card } from 'antd';
import { HomeOutlined, SkinOutlined,} from '@ant-design/icons';
import ViewCategoryItems from '../../components/ViewCategoryItems/ViewCategoryItems';
import CreateClothingItemModal from '../../components/CreateClothingItemModal/CreateClothingItemModal';
import styles from './closet-page-view.module.css';

const ClosetPageView = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [closetUpdated, setClosetUpdated] = useState(0);

    const { Content, Sider } = Layout;
    const { TabPane } = Tabs;

    return (
        <Layout
        style={{
            minHeight: '100vh',
        }}
        >
            <Sider
                theme="light"
                style={{
                    backgroundColor: 'white',
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
                    <Menu.Item key="1" icon={<HomeOutlined />} >
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
                        backgroundColor: '#f5f3f4',
                    }}
                >
                    <Card className={styles['header']}>
                        <div className={styles['header-text']}
                        >Here you can view and edit all of your clothes!</div>
                        <Button
                            type="primary"
                            onClick={() => setCreateModalOpen(true)}
                            className={styles['create-button']}
                        >Create Item</Button>
                    </Card>
                    <CreateClothingItemModal
                        isOpen={createModalOpen}
                        setIsOpen={setCreateModalOpen}
                        closetUpdated={closetUpdated}
                        setClosetUpdated={setClosetUpdated}
                     />
                    <Tabs
                        onChange={(key) => console.log(key)}
                        defaultActiveKey="1"
                        className={styles['tabs']}
                    >
                        <TabPane tab="Tops" key="1">
                            <ViewCategoryItems category={"tops"} closetUpdated={closetUpdated} setClosetUpdated={setClosetUpdated} />
                        </TabPane>
                        <TabPane tab="Bottoms" key="2">
                            <ViewCategoryItems category={"bottoms"} closetUpdated={closetUpdated} setClosetUpdated={setClosetUpdated} />
                        </TabPane>
                        <TabPane tab="Outerwear" key="3">
                        <ViewCategoryItems category={"outerwear"} closetUpdated={closetUpdated} setClosetUpdated={setClosetUpdated} />
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ClosetPageView;