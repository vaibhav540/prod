import React, { useEffect, useState } from 'react';
import { Avatar, Button, Image, Layout, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import AtgLogo from '../assets/logo/AtgeirLogo.svg';
import { FaUserCircle } from 'react-icons/fa';


const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const AppLayout = () => {
    const [userData, setUserData] = useState({ name: '', picture: '' });
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const pathToKeyMap = {
        '/home/account-level': '1-1',
        '/home/dataset-level': '1-2',
        '/home/migration-plan': '2',
        '/home/security-migration': '3',
        '/home/schema-migration': '4',
        '/home/data-migration': '5',
        '/home/sps-view-migration': '6',
        '/home/process-logs': '7',
        '/home/dashboard': '8',
    };

    const keyToPathMap = Object.fromEntries(Object.entries(pathToKeyMap).map(([path, key]) => [key, path]));
    const [selectedKey, setSelectedKey] = useState(location.pathname);


    useEffect(() => {
        const currentKey = Object.keys(pathToKeyMap).find(
            (path) => location.pathname === path
        );
        setSelectedKey(currentKey ? pathToKeyMap[currentKey] : '1-1');
    }, [location.pathname]);

    const handleMenuChange = (newKey) => {
        setSelectedKey(newKey);
        navigate(keyToPathMap[newKey]);
    };    

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            try {
                const parsedData = JSON.parse(storedUserData);
                setUserData(parsedData);
            } catch (error) {
                console.error("Failed to parse userData from localStorage:", error);
            }
        }
    }, []);

    const toggleCollapsed = () => {
        if (window.innerWidth <= 768) {
            setDrawerVisible(!drawerVisible);
        } else {
            setCollapsed(!collapsed);
        }
    };

    return (
        <Layout style={{ width: '100%', height: '100vh' }}>
            <Sider width="25%" className='custom-menu'>
                <Sidebar
                    selectedKey={selectedKey}
                    setSelectedKey={handleMenuChange}
                />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#ED7966', height: 62 }}>
                    <Text className="heading"> Migration Tool</Text>
                    <Image
                        style={{ position: "fixed", top: "0px", left: "0", height: "12%", width: "12%" }}
                        src={AtgLogo}
                    />
                    <div className="sidebar-user-info">
                        <Text className="sidebar-user-name">
                            <span>Welcome, </span> {userData.given_name}
                        </Text>
                        <Avatar src={userData.picture ? userData.picture : <FaUserCircle />} size={40} />
                        <Button
                            className="sidebar-hamburger-btn"
                            icon={drawerVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            onClick={toggleCollapsed}
                        />
                    </div>
                </Header>
                <Content className="content">
                    <Outlet /> 
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
