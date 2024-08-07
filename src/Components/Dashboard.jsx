import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu,Dropdown } from 'antd';
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
  const navigate=useNavigate()

  
        const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div style={{display:"flex"}}>
      <div style={{width: "20vw",height:"95vh",backgroundColor:"rgb(0, 21, 41)"}}>
        <Button type="primary" onClick={toggleCollapsed}
          style={{marginTop: 16}}
        >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu style={{marginTop: 16,borderRadius:"5px"}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
    </div >
    {/* Invoices */}
    {/* <div style={{marginLeft:"10px",marginTop:"10px",fontSize:"20px"}}>
        <div style={{display:"flex"}}>
          <p>Recent Invoices</p>
          <Button style={{marginLeft:"10px"}}  onClick={()=>navigate('/new')} type="primary">+ New</Button>
        </div>
        <div style={{display:"flex",height:"20vh", width:"78vw",justifyContent:"center",alignItems:"center"}}>
          <p>Nothing to see here yet. Click 'New' above to get started!</p>
        </div>
        <hr />
        <div>
          <p style={{fontSize:"30px"}}>All invoices</p>
        </div>
    </div> */}
    <div>
      <p>Clients</p>
    </div>
    </div>
  );
};
export default Dashboard