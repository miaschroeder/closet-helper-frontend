import { HomeOutlined, SkinOutlined,} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SuggestedClothes from '../../components/SuggestedClothes/SuggestedClothes';

const HomePageView = () => {
    const [collapsed, setCollapsed] = useState(false);
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
                defaultSelectedKeys={['1']}
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
                <h1
                >
                    Home Page View
                </h1>
                <SuggestedClothes />
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

export default HomePageView;