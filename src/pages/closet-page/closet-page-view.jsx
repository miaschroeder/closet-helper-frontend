import { HomeOutlined, SkinOutlined,} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import SuggestedClothes from '../../components/SuggestedClothes/SuggestedClothes';
const { Content, Footer, Sider } = Layout;

const ClosetPageView = () => {
    const [collapsed, setCollapsed] = useState(false);
    const menuItems = [
        {key: '1', label: 'Home', icon: <HomeOutlined />},
        {key: '2', label: 'Closet', icon: <SkinOutlined />},
        ]


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
                items={menuItems}
                // onClick={(key, item, domEvent, keyPath) => {
                //     console.log({
                //         key,
                //         item,
                //         domEvent,
                //         keyPath
                //     });

                // }}
                onClick={(info) => console.log(info)}
            />
        </Sider>
        <Layout className="site-layout">
            <Content
            style={{
                margin: '0 16px',
            }}
            >
                <div
                    className="site-layout-background"
                    style={{
                    padding: 24,
                    minHeight: 360,
                    }}
                >
                    Closet Page View.
                </div>
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

export default ClosetPageView;