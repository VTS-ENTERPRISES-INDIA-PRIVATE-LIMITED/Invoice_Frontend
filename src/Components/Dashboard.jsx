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
import { Button, Menu,Dropdown,Input, Space } from 'antd';
import ClientImg from './14b9c2d3fc8e930d59126591c1fcbbfd.png'

const { Search } = Input;
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

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Dashboard = () => {
  const navigate=useNavigate()

  const [invoiceDisplay,setinvoiceDisplay]=useState(true)
  const [clientDisplay,setclientDisplay]=useState(false)

  
        const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const changeState=(e)=>{
    const temp=parseInt(e.key)
    console.log(typeof(temp))
    if (temp === 1){
      setinvoiceDisplay(true)
      setclientDisplay(false)
  }
    if (temp === 2){
      setinvoiceDisplay(false)
      setclientDisplay(true)
};
    
  }
  return (
    <div style={{display:"flex"}}>
      <div style={{width: "20vw",height:"95vh",backgroundColor:"rgb(0, 21, 41)"}}>
        {/* <Button type="primary" onClick={toggleCollapsed}
          style={{marginTop: 16}}
        >
        { <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
        {/* </Button> */}
        <Menu style={{marginTop: 16,borderRadius:"5px"}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={collapsed}
          items={items}
          // {setclientDisplay(true)
          //   setinvoiceDisplay(false)}
          onClick={(e)=>changeState(e)}
        />
    </div >
    {/* Invoices */}
    {invoiceDisplay &&
    <div style={{marginLeft:"10px",marginTop:"10px",fontSize:"20px"}}>
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
    </div>
    }
    {/* Client */}
    {clientDisplay &&
    <div style={{margin:"20px 20px",padding:"20px 20px", width:"90vw"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <p style={{fontSize:"30px"}}>Clients</p>
        <div style={{display:"flex"}}>
          <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
          />
          <Button style={{marginLeft:"10px"}}  onClick={()=>navigate('/new')} type="primary">+ Add Client</Button>
        </div>
      </div>
      <div>
        <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginTop:"20px",borderRadius:"5px", border:"1px solid black",height:"15vh",width:"40vh"}}>
          <img style={{borderRadius:"50px"}} height={"50vh"} width={"50vw"} src={ClientImg} alt="" />
          <div style={{marginLeft:"5px"}}>
            <h3 style={{padding:"0px",margin:"0px"}}>Client Name</h3>
            <p>Company Name:</p>
            <p>Email:</p>
            <p>Country:</p>
          </div>
            

        </div>
      </div> 
    </div>
    }
    </div>
  );
};
export default Dashboard