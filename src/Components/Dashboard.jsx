import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
const items = [
  {
    key: '1',
    icon: <ContainerOutlined />,
    label: 'Invoices',
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: 'Clients',
  },
  {
    key: '3',
    icon: <PieChartOutlined />,
    label: 'My Settings',
  },
];


const Dashboard = () => {
        const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
        <div
      style={{
        width: "20vw"
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
    <div>
        <p>Recent Invoices</p>
    </div>
    </>
  );
};
export default Dashboard