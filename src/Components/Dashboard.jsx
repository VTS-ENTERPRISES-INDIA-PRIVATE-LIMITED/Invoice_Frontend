import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import {
  ContainerOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import { Button, Menu,Dropdown,Input, Space } from 'antd';
import ClientImg from './14b9c2d3fc8e930d59126591c1fcbbfd.png'
import client2Img from './logo.jpg'
import { Form, Select, Upload, Card, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Table,DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const recentInvoices = [
  {
    id: '0003',
    total: '$200.00',
    issueDate: '09/08/2024',
  },
];

const columns = [
  {
    title: 'Invoice No#',
    dataIndex: 'invoiceNo',
    key: 'invoiceNo',
    sorter: true,
  },
  {
    title: 'Invoice Type',
    dataIndex: 'invoiceType',
    key: 'invoiceType',
  },
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'Issue Date',
    dataIndex: 'issueDate',
    key: 'issueDate',
  },
  {
    title: 'Total Value',
    dataIndex: 'totalValue',
    key: 'totalValue',
  },
  
];

const data = [
  {
    key: '1',
    invoiceNo: '0003',
    invoiceType: 'Invoice',
    client: 'Gandu OP',
    issueDate: '09/08/2024',
    totalValue: '$200.00',
  },
  {
    key: '2',
    invoiceNo: '0002',
    invoiceType: 'Invoice',
    client: 'Gandu OP',
    issueDate: '08/08/2024',
    totalValue: '$200.00',
  },
  {
    key: '3',
    invoiceNo: '0001',
    invoiceType: 'Invoice',
    client: 'Gandu OP',
    issueDate: '08/08/2024',
    totalValue: '$200.00',
  },
];

const { Option } = Select;

 
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
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Dashboard = () => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };


  const navigate=useNavigate()

  const [invoiceDisplay,setinvoiceDisplay]=useState(true)
  const [clientDisplay,setclientDisplay]=useState(false)
  const [clientList,setclientList]=useState(false)
  const [addClient,setaddClient]=useState(false)
  const [editClient,seteditClient]=useState(false)

  
  const changeState=(e)=>{
    const temp=parseInt(e.key)
    console.log(typeof(temp))
    if (temp === 1){
      setinvoiceDisplay(true)
      setclientDisplay(false)
      setclientList(false)
      setaddClient(false)
      seteditClient(false)

  }
    if (temp === 2){
      setinvoiceDisplay(false)
      setclientDisplay(true)
      setclientList(false)
      setaddClient(false)
      seteditClient(false)

};
    
  }
  return (
    <div style={{display:"flex",backgroundColor:"rgb(232, 232, 232)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column", width: "15%",height:"100vh",backgroundColor:"rgb(0, 21, 41)"}}>
        <Menu style={{paddingTop: "20px",borderRadius:"5px"}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={items}
          onClick={(e)=>changeState(e)}
        />
      <Button style={{marginBottom:"20px",height:"30px",width:"9vw"}} type="primary" icon={<LogoutOutlined />} onClick={()=>(navigate('/'))}>
      Sign Out</Button>
      </div >
    {/* Invoices */}
    {invoiceDisplay &&
    <div style={{paddingLeft:"10px",padding:"30px",fontSize:"20px",width:"80%"}}>
        <div style={{display:"flex"}}>
          <p>Recent Invoices</p>
          <Button style={{marginLeft:"10px"}}  onClick={()=>navigate('/new')} type="primary">+ New</Button>
        </div>
        <div className="recent-invoices">
        <Row style={{width:"100vw",marginTop:"20px"}}>
          {recentInvoices.map(invoice => (
            <Col span={5} key={invoice.id}>
              <Card className="invoice-card">
                <div className="invoice-card-logo">GO</div>
                <div className="invoice-card-total">TOTAL</div>
                <div className="invoice-card-amount">{invoice.total}</div>
                <div>Invoice: {invoice.id}</div>
                <div>Issue Date: {invoice.issueDate}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
        <hr />
        <div>
          <p style={{fontSize:"30px"}}>All invoices</p>
        </div>
        <div className="ctn-body">
      

      <div className="all-invoices">
        {/* <h2>All invoices</h2> */}
        <div className="filters">
          <Search placeholder="Search" style={{ width: 200, marginRight: 16 }} />
          <RangePicker placeholder={['Start Issue Date', 'End Issue Date']} />
          <Button type="default" style={{ marginLeft: 16 }}>Reset</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} style={{ marginTop: 16 }} />
      </div>
    </div>

    </div>
    }
    {/* Client */}
    {clientDisplay &&
    <div style={{padding:"30px", width:"73%"}}>
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
          <Button style={{marginLeft:"10px"}}  onClick={()=>{
            setaddClient(true)
            setclientDisplay(false)
          }} type="primary">+ Add Client</Button>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-evenly",width:"100%"}}>
        {/* 1 */}
        <div>
          <button style={{display:"flex",justifyContent:"space-evenly",backgroundColor:"white",alignItems:"center",marginTop:"20px",borderRadius:"9px", border:"0px solid grey",height:"15vh",width:"40vh",cursor:"pointer",background:"white"}} onClick={()=>{setclientDisplay(false)
            setclientList(true)
          }}>
            <img style={{borderRadius:"50px"}} height={"50vh"} width={"50vw"} src={ClientImg} alt="" />
            <div style={{marginLeft:"5px"}}>
              <h3 style={{padding:"0px",margin:"0px"}}>Client Name</h3>
              <p>Company Name:</p>
              <p>Email:</p>
              <p>Country:</p>
            </div>

          </button>
        </div> 
        {/* 2 */}
        <div>
          <button style={{display:"flex",justifyContent:"space-evenly",backgroundColor:"white",alignItems:"center",marginTop:"20px",borderRadius:"9px", border:"0px solid grey",height:"15vh",width:"40vh",cursor:"pointer",background:"white"}} onClick={()=>{setclientDisplay(false)
            setclientList(true)
          }}>
            <img style={{borderRadius:"50px"}} height={"50vh"} width={"50vw"} src={client2Img} alt="" />
            <div style={{marginLeft:"5px"}}>
              <h3 style={{padding:"0px",margin:"0px"}}>John Dev</h3>
              <p>Generous</p>
              <p>20331a1265@vts.com</p>
              <p>Australia</p>
            </div>

          {/* </div> */}
          </button>
        </div> 
      </div>
    </div>
    }
    {/* List of Clients */}
    {clientList && 
    <div style={{padding:"30px"}}>
      {/* 1 */}
      <div style={{display:"flex",width:"80vw",justifyContent:"space-between",marginBottom:"20px"}} >
        <div style={{display:"flex",backgroundColor:"white",justifyContent:"space-evenly",alignItems:"center",borderRadius:"10px", border:"0px solid grey",height:"15vh",width:"80vw"}}>
          <div style={{display:"flex",marginLeft:"5%",width:"35vw",justifyContent:"space-between",alignItems:"center"}}>
            <img style={{borderRadius:"50px"}} height={"60vh"} width={"60vw"} src={ClientImg} alt="" />
            <div style={{marginLeft:"5px",textAlign:"center",width:"20vw"}}>
              <h3 style={{padding:"0px",margin:"0px"}}>Jack waine</h3>
              <p>Generous</p>
              <p>generous@gmail.com</p>
              <p>USA</p>
            </div>
          </div>
            <div style={{margin:"20px",width:"10vw",display:"flex ",justifyContent:"space-between"}}>
              <Button type='primary' onClick={()=>{seteditClient(true) 
                                                    setclientList(false)}} >Edit</Button>
              <Button type="primary" danger>Delete</Button>
            </div>
          </div>
      </div>
      <br />
      <hr />
      <div>
        <p>Invoice</p>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} style={{ marginTop: 16 }} />
      
    </div>
    }
    {addClient &&
    <Card
      title="Add Client"
      bordered={true}
      style={{ margin:"60px" ,height: '100%',width:"70%",border:'0.1px solid grey' }}
    >
      <Form
        form={form}
        name="edit-client"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          country: 'India',
        }}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item
              name="clientLogo"
              label="Client Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                name="files"
                action="/upload.do"
                listType="picture-card"
                style={{ width: 150, height: 100 }}
              >
                <div>
                  <InboxOutlined style={{ fontSize: '24px' }} />
                  <p style={{ marginTop: 8 }}>Upload</p>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="companyName"
                  label="Company name"
                  rules={[{ required: true, message: 'Please input the company name!' }]}
                >
                   <Input placeholder="Enter company name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First name"
                  rules={[{ required: true, message: 'Please input the first name!' }]}

                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last name"
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email address"
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                >
                  <Select>
                    <Option value="India">India</Option>
                    <Option value="England">England</Option>
                    <Option value="USA">USA</Option>
                  </Select>
                  </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone number"
                >
                  <Input type="number" placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={20}>
                <Form.Item
                  name="addressLine1"
                  label="Address line 1"
                >
                  <Input placeholder="Enter address line 1" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="postalCode"
                  label="Postal code"
                >
                  <Input type="number" placeholder="Enter postal code" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
     }
     {editClient &&
    <Card
      title="Edit Client"
      bordered={true}
      style={{ margin:"60px" ,height: '100%',width:"70%",border:'0.1px solid grey' }}
    >
      <Form
        form={form}
        name="edit-client"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          country: 'India',
        }}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item
              name="clientLogo"
              label="Client Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger
                name="files"
                action="/upload.do"
                listType="picture-card"
                style={{ width: 150, height: 100 }}
              >
                <div>
                  <InboxOutlined style={{ fontSize: '24px' }} />
                  <p style={{ marginTop: 8 }}>Upload</p>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="companyName"
                  label="Company name"
                  rules={[{ required: true, message: 'Please input the company name!' }]}
                >
                   <Input placeholder="Enter company name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First name"
                  rules={[{ required: true, message: 'Please input the first name!' }]}

                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last name"
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email address"
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                >
                  <Select>
                    <Option value="India">India</Option>
                    <Option value="England">England</Option>
                    <Option value="USA">USA</Option>
                  </Select>
                  </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone number"
                >
                  <Input type="number" placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={20}>
                <Form.Item
                  name="addressLine1"
                  label="Address line 1"
                >
                  <Input placeholder="Enter address line 1" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="postalCode"
                  label="Postal code"
                >
                  <Input type="number" placeholder="Enter postal code" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
     }
    </div>
  );
};
export default Dashboard