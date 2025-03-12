// import React, { useState, useEffect } from 'react';
// import { Layout, Menu } from 'antd';
// import { DatabaseOutlined } from '@ant-design/icons';
// import { MdAccountCircle, MdDataset } from "react-icons/md";

// const { Sider } = Layout;
// const { SubMenu } = Menu;

// const Sidebar = ({ selectedKey, setSelectedKey }) => {
//     const [collapsed, setCollapsed] = useState(false);
//     const [drawerVisible, setDrawerVisible] = useState(false);

//     const isMetadataMigrationActive = ['1-1', '1-2'].includes(selectedKey);

//     const toggleCollapsed = () => {
//         if (window.innerWidth <= 768) {
//             setDrawerVisible(!drawerVisible);
//         } else {
//             setCollapsed(!collapsed);
//         }
//     };

//     const handleMenuClick = (e) => {
//         setSelectedKey(e.key);
//         if (window.innerWidth <= 768) {
//             setDrawerVisible(false);
//         }
//     };

//     return (
//         <>
//             <Sider
//                 width={215}
//                 style={{ height: 'calc(100vh - 64px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
//                 collapsible
//                 collapsed={collapsed}
//                 trigger={null}
//                 breakpoint="md"
//                 collapsedWidth="0"
//                 className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}
//             >
//                 <div className="sidebar-menu-container">
//                     <Menu
//                         mode="inline"
//                         selectedKeys={[selectedKey]}
//                         defaultOpenKeys={['1']}
//                         onClick={handleMenuClick}
//                         className="custom-menu"
//                     >
//                         <SubMenu
//                             key="1"
//                             icon={<DatabaseOutlined />}
//                             title="Metadata Migration"
//                             className={isMetadataMigrationActive ? 'submenu-active' : ''}
//                         >
//                             <Menu.Item key="1-1" icon={<MdAccountCircle />}>
//                                 Account Level
//                             </Menu.Item>
//                             <Menu.Item key="1-2" icon={<MdDataset />}>
//                                 Dataset Level
//                             </Menu.Item>
//                         </SubMenu>
//                     </Menu>
//                 </div>
//             </Sider>
//         </>
//     );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import { MdAccountCircle, MdDataset } from "react-icons/md";
import { FaTasks, FaShieldAlt, FaDatabase, FaTable, FaCode, FaClipboardList, FaTachometerAlt } from "react-icons/fa";

const { Sider } = Layout;
const { SubMenu } = Menu;

const menuItems = [
    {
        key: '1',
        title: 'Metadata Migration',
        icon: <DatabaseOutlined />,
        subItems: [
            { key: '1-1', title: 'Account Level', icon: <MdAccountCircle /> },
            { key: '1-2', title: 'Dataset Level', icon: <MdDataset /> }
        ]
    },
    { key: '2', title: 'Migration Plan', icon: <FaTasks /> },
    { key: '3', title: 'Security Migration', icon: <FaShieldAlt /> },
    { key: '4', title: 'Schema Migration', icon: <FaDatabase /> },
    { key: '5', title: 'Data Migration', icon: <FaCode /> },
    { key: '6', title: 'SPs & View Migration', icon: <FaTable /> },
    { key: '7', title: 'Process Log', icon: <FaClipboardList /> },
    { key: '8', title: 'Dashboard', icon: <FaTachometerAlt /> }
];

const Sidebar = ({ selectedKey, setSelectedKey }) => {
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <Sider width={215} collapsible className="sidebar">
            <Menu mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
                {menuItems.map((menu) => (
                    menu.subItems ? (
                        <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                            {menu.subItems.map((sub) => (
                                <Menu.Item key={sub.key} icon={sub.icon}>{sub.title}</Menu.Item>
                            ))}
                        </SubMenu>
                    ) : (
                        <Menu.Item key={menu.key} icon={menu.icon}>{menu.title}</Menu.Item>
                    )
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidebar;

