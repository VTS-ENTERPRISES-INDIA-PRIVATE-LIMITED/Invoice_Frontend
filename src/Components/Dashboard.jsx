import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import {
  ContainerOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import { Button, Menu,Input } from 'antd';
import ClientImg from './14b9c2d3fc8e930d59126591c1fcbbfd.png'
import client2Img from './logo.jpg'
import { Form, Select, Upload, Card, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Table,DatePicker } from 'antd';
import { message } from 'antd';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Invoice ID',
    dataIndex: 'invoice_id',  // Corrected to match data
    key: 'invoice_id',         // Corrected to match data
  },
  {
    title: 'Client Name',
    dataIndex: 'client_name',      // Corrected to match data
    key: 'client',            // Corrected to match data
  },
  {
    title: 'Issue Date',
    dataIndex: 'date_of_invoice_generation',   // No change needed
    key: 'issueDate',         // No change needed
  },
  {
    title: 'Total Amount',
    dataIndex: 'payable_amount',  // Corrected to match data
    key: 'totalValue',        // Corrected to match data
  },
  {
    title: 'Invoice Link',
    dataIndex: 'invoice_link',      // Add this key in your data array if it doesn't exist
    key: 'status',
  },
];




const data = [
  {
    key: '1',
    invoiceNo: '0003',  // Changed key to match columns
    client: 'Gandu OP',
    issueDate: '09/08/2024',
    totalValue: '$200.00',  // Changed key to match columns
    status: 'Paid'  // Ensure this key exists in the data
  },
  // ...other items
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
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [form] = Form.useForm();
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [clientForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState(''); // Assuming clientId is available in state

  useEffect(() => {
    // Fetch client data when component mounts
    const loadClientData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/clients/${clientId}`);
        const clientData = await response.json();
        clientForm.setFieldsValue({
          companyName: clientData.companyName,
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          country: clientData.country,
          phoneNumber: clientData.phoneNumber,
          addressLine1: clientData.addressLine1,
          postalCode: clientData.postalCode,
          city: clientData.city,
          clientLogo: clientData.clientLogo ? [{ url: clientData.clientLogo, name: 'Client Logo' }] : [],
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading client data:', error);
        message.error('Failed to load client data.');
        setIsLoading(false);
      }
    };

    if (clientId) {
      loadClientData();
    }
  }, [clientId, clientForm]);

  const transformFile = (event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event?.fileList;
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Prepare data for submission
      const dataToSend = new FormData();
      dataToSend.append('image_url', formData.clientLogo ? formData.clientLogo[0].originFileObj : null);
      dataToSend.append('companyName', formData.companyName);
      dataToSend.append('firstName', formData.firstName);
      dataToSend.append('lastName', formData.lastName);
      dataToSend.append('email', formData.email);
      dataToSend.append('country', formData.country);
      dataToSend.append('phoneNumber', formData.phoneNumber);
      dataToSend.append('addressLine1', formData.addressLine1);
      dataToSend.append('postalCode', formData.postalCode);
      dataToSend.append('city', formData.city);

      // Send data to backend
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'PUT',
        body: dataToSend,
      });

      if (response.ok) {
        message.success('Client details updated successfully!');
      } else {
        message.error('Failed to update client details.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('An error occurred while updating client details.');
    }
  };
  

  useEffect(() => {
    fetchClientData();
    fetchClientInvoices();
  }, []);
  const fetchClientData = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients/get-clients',{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}}); // Replace with your actual API endpoint
      const data = await response.json();
      setClient(data);
      console.log("Fetching Client Data",data);
      
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const fetchClientInvoices = async () => {
    try {
      const response = await fetch('http://localhost:5000/invoices/get-all-invoicess',{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}}); // Replace with your actual API endpoint
      const data = await response.json();
      setInvoices(data);
      console.log("Invoices Data",data);
      
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };
  // if (!client) return <p>Loading...</p>;

  const handleDeleteClient = async (clientId) => {
    // Step 1: Confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (!confirmDelete) return;

    try {
      // Step 2: API call to delete the client
      const response = await fetch(`http://localhost:5000/clients/delete-client/${clientId}`, {
        method: 'DELETE',
      },{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}});

      if (response.ok) {
        // Step 3: Notify user of success and update UI
        message.success('Client deleted successfully.');
        setClient(null);  // Remove the client from the state
        setInvoices([]);   // Clear the associated invoices
        // Additional logic to update the list of clients if necessary
      } else {
        // Handle errors
        const errorData = await response.json();
        message.error(`Failed to delete client: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      message.error('An error occurred while deleting the client.');
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients/get-clients',{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}}); // Replace with your actual API endpoint
      const data = await response.json();
      setClients(data);
      console.log("Fetching Clients",data);
      
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };
  
useEffect(() => {
  // Fetch data from the backend when the component mounts
  fetchRecentInvoices();
  fetchAllInvoices();
}, []);

const fetchRecentInvoices = async () => {
  try {
    const response = await fetch('http://localhost:5000/invoices/get-all-invoicess',{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}}); // Replace with your actual API endpoint
    const data = await response.json();
    setRecentInvoices(data);
    console.log("Fetching Recent Invoices",data);
    
  } catch (error) {
    console.error('Error fetching recent invoices:', error);
  }
};

const fetchAllInvoices = async () => {
  try {
    const response = await fetch('http://localhost:5000/invoices/get-all-invoicess',{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}}); // Replace with your actual API endpoint
    const data = await response.json();
    setAllInvoices(data);
    console.log("Fetching All Invoices",data);
    
  } catch (error) {
    console.error('Error fetching all invoices:', error);
  }
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = async (values) => {
  try {
    // Prepare the data to send to the backend
    const formData = new FormData();
    formData.append('image_url', values.image_url ? values.clientLogo[0].originFileObj : null);
    formData.append('companyName',values.companyName);
    formData.append('first_name', values.firstName);
    formData.append('last_name.', values.lastName);
    formData.append('email', values.email);
    formData.append('country', values.country);
    formData.append('phone', values.phoneNumber);
    formData.append('address', values.addressLine1);
    formData.append('postal', values.postalCode);
    formData.append('city', values.city);
    console.log(formData);
    
    // Send POST request to the backend API
    const response = await fetch('http://localhost:5000/clients/create-client', {
      method: 'POST',
      body: formData,

      
    },{headers:{"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODk5OSwiZXhwIjoxNzIzMjg1Mzk5fQ.PDndg0spVtgV9vgDHS-ssdhxWLXfKs5BSfQziCLUH1Q"}});
    console.log(response);
    
    if (response.ok) {
      message.success('Client added successfully!');
      form.resetFields(); // Clear the form after successful submission
    } else {
      message.error('Failed to add client.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    message.error('An error occurred while adding the client.');
  }
};

  const navigate=useNavigate()

  const [invoiceDisplay,setinvoiceDisplay]=useState(true)
  const [clientDisplay,setclientDisplay]=useState(false)
  const [clientList,setclientList]=useState(false)
  const [addClient,setaddClient]=useState(false)
  const [editClient,seteditClient]=useState(false)

  
  const changeState = (e) => {
    const temp = parseInt(e.key);
    if (temp === 1) {
      setinvoiceDisplay(true);
      setclientDisplay(false);
      setclientList(false);
      setaddClient(false);
      seteditClient(false);
    } else if (temp === 2) {
      setinvoiceDisplay(false);
      setclientDisplay(true);
      setclientList(false);
      setaddClient(false);
      seteditClient(false);
    }
  };
  // if (!client) return <p>Loading...</p>;














  
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
      <Button style={{marginBottom:"20px",height:"30px",width:"9vw"}} type="primary" icon={<LogoutOutlined />} onClick={() => navigate('/')}>
      Sign Out</Button>
      </div >
    {/* Invoices */}
    {invoiceDisplay &&
    <div style={{ paddingLeft: "10px", padding: "30px", fontSize: "20px", width: "80%" }}>
    <div style={{ display: "flex" }}>
      <p>Recent Invoices</p>
      <Button style={{ marginLeft: "10px" }} onClick={() => navigate('/new')} type="primary">+ New</Button>
    </div>
    <div className="recent-invoices">
      <Row style={{ width: "100vw", marginTop: "20px" }}>
        {recentInvoices.map(invoice => (
          <Col span={5} key={invoice.id}>
            <Card className="invoice-card">
              <div className="invoice-card-logo">GO</div>
              <div className="invoice-card-total">TOTAL</div>
              <div className="invoice-card-amount">{invoice.total}</div>
              <div>Invoice: {invoice.invoice_id}</div>
              <div>Customer: {invoice.client_name}</div>
              <div>Payable Amount: {invoice.payable_amount}</div>
              <div>Issue Date: {invoice.date_of_invoice_generation}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    <hr />
    <div>
      <p style={{ fontSize: "30px" }}>All invoices</p>
    </div>
    <div className="ctn-body">
      <div className="all-invoices">
        <div className="filters">
          <Search placeholder="Search" style={{ width: 200, marginRight: 16 }} />
          <RangePicker placeholder={['Start Issue Date', 'End Issue Date']} />
          <Button type="default" style={{ marginLeft: 16 }}>Reset</Button>
        </div>
        <Table columns={columns} dataSource={allInvoices} rowKey="id" pagination={false} style={{ marginTop: 16 }} />
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
      {clients.map(client => (
        <button
          key={client.id}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            alignItems: "center",
            marginTop: "20px",
            borderRadius: "9px",
            border: "0px solid grey",
            height: "15vh",
            width: "40vh",
            cursor: "pointer",
            background: "white"
          }}
          onClick={() => {
            // Handle the button click logic here
            setclientDisplay(false);
            setclientList(true);
          }}
        >
          <img
            style={{ borderRadius: "50px" }}
            height={"50vh"}
            width={"50vw"}
            src={client.image || {ClientImg}} // Use client image or a default image
            alt={`${client.name}'s profile`}
          />
          <div style={{ marginLeft: "5px" }}>
            <h3 style={{ padding: "0px", margin: "0px" }}>{client.city}</h3>
            <p>Company Name: {client.company_name}</p>
            <p>Email: {client.email}</p>
            <p>Country: {client.country}</p>
          </div>
        </button>
      ))}
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

          </button>
        </div> 
      </div>
    </div>
    }
    {/* List of Clients */}
    {clientList && 
    <div style={{padding:"30px"}}>
      {/* 1 */}
      <div>
      <div style={{ display: "flex", width: "80vw", justifyContent: "space-between", marginBottom: "20px" }}>
      {clients.map(client => (
        <div style={{ display: "flex", backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center", borderRadius: "10px", border: "0px solid grey", height: "15vh", width: "80vw" }}>
          <div style={{ display: "flex", marginLeft: "5%", width: "35vw", justifyContent: "space-between", alignItems: "center" }}>
            <img style={{ borderRadius: "50px" }} height={"60vh"} width={"60vw"} src={client.image || {ClientImg}} alt={`${client.name}'s profile`} />
            <div style={{ marginLeft: "5px", textAlign: "center", width: "20vw" }}>
              <h3 style={{ padding: "0px", margin: "0px" }}>{client.name}</h3>
              <p>{client.company_name}</p>
              <p>{client.email}</p>
              <p>{client.country}</p>
            </div>
          </div>
          <div style={{ margin: "20px", width: "10vw", display: "flex", justifyContent: "space-between" }}>
            <Button type='primary' onClick={() => { seteditClient(true); setclientList(false); }}>Edit</Button>
            <Button type="primary" danger onClick={() => handleDeleteClient(client.id)}>Delete</Button>
          </div>
        </div>
      ))}
      </div>
      <br />
      <hr />
      <div>
        <p>Invoice</p>
      </div>
      <Table columns={columns} dataSource={invoices} pagination={false} style={{ marginTop: 16 }} />
    </div>
      
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
    style={{ margin: "60px", height: '100%', width: "70%", border: '0.1px solid grey' }}
  >
    <Form
      form={clientForm}
      name="client-edit-form"
      onFinish={handleFormSubmit}
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
            getValueFromEvent={transformFile}
          >
            <Upload.Dragger
              name="files"
              listType="picture-card"
              beforeUpload={() => false} // Prevents immediate upload
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
        <Button type="primary" htmlType="submit" loading={isLoading}>
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