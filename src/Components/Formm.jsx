import React, {  useState } from 'react';
// import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Slider,Input } from 'antd';
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input;


const Form = () => {
    
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
      const onChanged = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
      const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };
    //Antd
    const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };  
  const [gstin,setGSTIN]=useState(0);
  const onChange = (value) => {
    setGSTIN(value);
  };
  const onChangeComplete = (value) => {
    setGSTIN(value);
  };

    const [preview,setPreview]=useState(false);
    const [count, setCount] = useState(1);
    const [invoice,setInvoice]=useState(false);
    const [formData, setFormData] = useState({
        customer_name: '',
        billing_address: '',
        shipping_address: '',
        items: [{ item_name: '', mrp: '', selling_price: '', qty: '' }],
    });
    const numberToWords = (num) => {
        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const scales = ['', 'thousand', 'million', 'billion', 'trillion'];
    
        if (num === 0) return 'zero';
    
        const parseGroup = (num) => {
            let str = '';
            const hundreds = Math.floor(num / 100);
            const remainder = num % 100;
            const ten = Math.floor(remainder / 10);
            const one = remainder % 10;
    
            if (hundreds) str += ones[hundreds] + ' hundred ';
            if (ten >= 2) str += tens[ten] + ' ';
            if (ten === 1) str += teens[one] + ' ';
            else if (one) str += ones[one] + ' ';
            return str.trim();
        };
    
        let words = "";
        let scaleIndex = 0;
        while (num > 0) {
            const chunk = num % 1000;
            if (chunk > 0) {
                words = parseGroup(chunk) + ' ' + scales[scaleIndex] + ' ' + words;
            }
            num = Math.floor(num / 1000);
            scaleIndex++;
        }
    
        return words.trim();
    };
    
    

    if (!formData) return null;

    const totalMRP = formData.items.reduce((sum, item) => sum + parseFloat(item.mrp) * parseInt(item.qty), 0);
    const totalAmount = formData.items.reduce((sum, item) => sum + parseFloat(item.selling_price) * parseInt(item.qty), 0);
    const totalSavings = totalMRP - totalAmount;
    const totalQty = formData.items.reduce((sum, item) => sum + parseInt(item.qty), 0);
    const cgst = totalAmount * 0.02;
    const sgst = totalAmount * 0.02;
    const totalAmountWithGST=totalAmount + cgst + sgst;

    
    const addItemRow = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { item_name: '', mrp: '', selling_price: '', qty: '' }],
        });
        setCount(count + 1);
    };

    const removeItemRow = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
        setCount(count - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('item_name') || name.includes('mrp') || name.includes('selling_price') || name.includes('qty')) {
            const index = parseInt(name.split('-')[1], 10);
            const key = name.split('-')[0];
            const newItems = formData.items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
            setFormData({ ...formData, items: newItems });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const submitForm = () => {
        setPreview(true)
        setInvoice(true)
        enterLoading(0)
    };

    return (
        <>{invoice && 
        
            
            <form id="item-form">
                <div className="form-container">
                    <h2 style={{marginBottom:"30px"}}>Customer Invoice Details Form</h2>
                    <div style={{display:"flex"}}>
                        <div className="customer-info">
                        <TextField 
                            required 
                            style={{width:"90%",marginBottom:"3vh"}} 
                            id="outlined-basic" 
                            name="customer_name" 
                            label="Customer Name" 
                            value={formData.customer_name} 
                            onChange={handleChange} 
                            variant="outlined" />
                        <TextField
                            required 
                            style={{width:"42.5%",marginBottom:"3vh"}}
                            id="outlined-multiline-static"
                            name='billing_address'
                            label="Billing Address"
                            multiline
                            value={formData.billing_address}
                            rows={4}
                            onChange={handleChange} 
                            variant="outlined"
                        />
                        <TextField
                            required 
                            style={{width:"42.5%",marginBottom:"3vh"}}
                            id="outlined-multiline-static"
                            label="Shipping Address"
                            name="shipping_address"
                            multiline
                            rows={4}
                            onChange={handleChange} 
                            variant="outlined"
                        />
               
                        </div>
                        <div id="items-container">
                        {formData.items.map((item, index) => (
                            <div className="item" key={index}>
                                <div className="item-selection">
                                    <p>Item Details</p>
                                    <Button type="primary" onClick={() => removeItemRow(index)}>remove</Button>
                                    {/* <button type="button" >remove</button> */}
                                </div>
                                <div className="item-row">
                                <TextField 
                                    required 
                                    style={{width:"42.5%",marginBottom:"3vh"}} 
                                    id="outlined-basic" 
                                    name={`item_name-${index}`}
                                    label="Item Name" 
                                    value={item.item_name}
                                    onChange={handleChange}
                                    variant="outlined" 
                                />
                                <TextField 
                                    required 
                                    style={{width:"42.5%",marginBottom:"3vh"}} 
                                    id="outlined-basic" 
                                    label="MRP" 
                                    name={`mrp-${index}`}
                                    value={item.mrp}
                                    onChange={handleChange}
                                    variant="outlined" 
                                />
                                <TextField 
                                    required 
                                    style={{width:"42.5%",marginBottom:"3vh"}} 
                                    id="outlined-basic" 
                                    label="Selling Price" 
                                    name={`selling_price-${index}`}
                                    value={item.selling_price}
                                    onChange={handleChange}
                                    variant="outlined" 
                                />
                                <TextField 
                                    required 
                                    style={{width:"42.5%",marginBottom:"3vh"}} 
                                    id="outlined-basic" 
                                    label="Qty" 
                                    name={`qty-${index}`}
                                    value={item.qty}
                                    onChange={handleChange}
                                    variant="outlined" 
                                />

                                    
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className='bottom'>

                        <div className="add-item-btn">
                            <Button type="primary" onClick={addItemRow}>Add Item</Button>
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <p style={{marginRight:"10px"}}>GSTIN</p>
                            <input style={{outline:"none",border:"1px solid grey",borderRadius:"5px",height:"20px"}} type="text" placeholder='07AAECR2971C1Z'/>
                            </div>
                            <p>Total Items - {count}</p>
                        </div><br />
                        <p style={{width:"100%",display:"flex",justifyContent:"center"}}>Set GSTIN : {gstin} %</p>
                        <Slider style={{}} defaultValue={0} onChange={onChange} onChangeComplete={onChangeComplete} />
                        <div className="submit-btn">
                            <Button type="primary"  loading={loadings[0]} onClick={submitForm}>
                                Generate Invoice
                            </Button>
                            { preview && <button type="button">Preview</button>}
                        </div>
                    </div>
                </div>
            </form>
        
        }







        {!invoice && 
        <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
        <div className="Invoice-page" id="invoice">
            <div className="top">
                <div className="top-address">
                    <h3 style={{color: 'rgb(35, 26, 167)', margin: '20px 0px 5px 0px'}}>TAX INVOICE</h3>
                    {/* <h2 style={{margin: '0px 0px 5px 0px'}}>VTS ENTERPRISES</h2> */}
                    <TextArea placeholder="Enter Company Name" autoSize />
                        <div
                            style={{
                            margin: '24px 0',
                            }}
                        />
                    {/* <h5 style={{margin: '0px 0px 5px 0px'}}>GSTIN 36AACCG0527D2Z4</h5>
                    <p>19 Washington Square N<br/>New York,<br/>NY 10011,<br/>USA</p> */}
                    <TextArea
                        placeholder="Company Address"
                        autoSize={{
                        minRows: 2,
                        maxRows: 6,
                        }}
                    />                
                </div>
                <div className="top-logo">
                    <h5 style={{color: 'rgb(126, 121, 114)'}}>ORIGINAL FOR RECIPIENT</h5>
                    <div style={{display: 'flex',justifyContent:"flex-end",width:"25vw",height:"20vh"}}>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        // fileList={fileList}
                        onChange={onChanged}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                        {/* <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo Goes Here" /> */}
                        {/* <p style={{fontSize: '100px', color: 'rgb(113, 172, 201)'}}>VTS</p> */}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="addresses">
                <div>
                    <p>Invoice #: <span><Input placeholder="Enter Invoice Number" /></span></p>
                    {/* <p>Invoice #: <span style={{fontWeight: 'bold'}}>INV-14</span></p> */}
                    
                    <br />
                    <p>Customer Details:</p>
                    {/* <p style={{fontWeight: 'bold'}} id='customer-name'>{formData.customer_name}</p> */}
                    <Input placeholder="Enter Customer Name" />
                </div>
                <div>
                    <p>Invoice Date: <span style={{fontWeight: 'bold'}}><Input placeholder="Invoice Date" /></span></p>
                    <br />
                    <p style={{fontWeight: 'bold'}} id='billing-address'>Billing address:</p>
                    {/* <p>{formData.billing_address}</p> */}
                    <TextArea
                        placeholder="Enter Billing Address"
                        autoSize={{
                        minRows: 2,
                        maxRows: 6,
                        }}
                    />
                </div>
                <div>

                    <p style={{fontWeight: 'bold',marginTop:"75px"}} id='shipping-address' >Shipping address:</p>
                    {/* <p>{formData.shipping_address}</p> */}
                    <TextArea
                        placeholder="Enter Shipping Address"
                        autoSize={{
                        minRows: 2,
                        maxRows: 6,
                        }}
                    />
                </div>
            </div>
            <br />
            <p>Place to Supply: <span style={{fontWeight: 'bold'}}><Input placeholder="Enter Place to Supply" /></span></p>
            <br />
            <div>   
                <table cellspacing="0" cellpadding="0">
                    <tr className="tabletop">
                        <th>#</th>
                        <th className="tabletop">Item</th>
                        <th className="tabletop" width="100px">MRP</th>
                        <th className="tabletop" width="100px">Selling Price</th>
                        <th className="tabletop">Qty</th>
                        <th className="tabletop" width="100px">Amount</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Input placeholder="Enter Item " /></td>
                        <td><Input placeholder="MRP" /></td>
                        <td><Input placeholder="Selling Price" /></td>
                        <td><Input placeholder="Qty" /></td>
                        <td><Input placeholder="Amount" /></td>
                    </tr>
                    {/* <tbody>
                        {formData.items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.item_name}</td>
                                <td>₹ {parseFloat(item.mrp).toFixed(2)}</td>
                                <td>₹ {parseFloat(item.selling_price).toFixed(2)}</td>
                                <td>{item.qty}</td>
                                <td>₹ {(parseFloat(item.selling_price) * parseInt(item.qty)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>
            <div className="total-mrp">
                <div className="total-mrp-det"> 
                    <div className="adjs">
                        <p>Total MRP:</p>
                        <p>Total Savings:</p>
                        <h3 style={{margin: '5px 0px 0px 0px'}}>Total:</h3>
                    </div>
                    <div>
                        <p>₹ {totalMRP.toFixed(2)}</p>
                        <p>₹ {totalSavings.toFixed(2)}</p>
                        <h3 style={{margin: '5px 0px 5px 0px'}}>₹ {totalAmount.toFixed(2)}</h3>
                    </div>
                </div>
                <div className="hr"></div>
                <div className="total-mrp-det-light">
                    <div>
                        <p>GST <Input style={{width:"5vw"}} placeholder="GSTIN" /> :</p>
                        <p>Total Amount with GST:</p>
                    </div>
                    <div>
                        <p>₹ {cgst.toFixed(2)}</p>
                        <p>₹ {totalAmountWithGST.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="price-words">
                <p>Total Items / Qty: <span>{formData.items.length}</span> / <span>{totalQty}</span></p>
                <p>Total amount (in words): <span>INR {numberToWords(totalAmountWithGST.toFixed(2))} only</span></p>
            </div>
            <br />
            <div style={{height: '1.5px', width: '100%', background: 'blue'}}></div>
            <br />
            <div className="footer-price">
                <p>Amount Payable :  ₹<span>{totalAmountWithGST.toFixed(2)}</span></p>
            </div>
            <div className="stamp">
                <div className="qr-price"> 
                    {/* <div style={{marginRight:"10px"}}>
                        <p style={{fontWeight: 'bold'}}>Pay using UPI:</p>
                        <img style={{height: '100px', width: '100px'}} src={process.env.PUBLIC_URL + '/images/temp-qr.png'} alt="QR" />
                    </div> */}
                    <div style={{width:"20vw"}}>
                        <div>
                        <p style={{fontWeight: 'bold'}}>Bank Details:</p>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"end"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                            <p>Bank Name:</p>
                            <p style={{fontWeight: 'bold'}}><Input placeholder="Enter Bank Name" /></p>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                            <p>Account # :</p>
                            <p style={{fontWeight: 'bold'}}><Input placeholder="Enter Account Number" /></p>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                            <p>IFSC :</p>
                            <p style={{fontWeight: 'bold'}}><Input placeholder="Enter IFSC" /></p>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                            <p>Branch :</p>
                            <p style={{fontWeight: 'bold'}}><Input placeholder="Enter Branch" /></p>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                    </div>
                    <div>
                        <p>&nbsp;</p>
                    </div> */}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p style={{fontWeight: 'bold', color: '#767070'}}>For <Input style={{width:"10vw"}} placeholder="Recepient Company" /></p>
                    <br />
                    {/* <img height="100px" width="110px" src={process.env.PUBLIC_URL + '/images/signature.png'} alt="Stamp" /> */}
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        // fileList={fileList}
                        onChange={onChanged}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </div>
            </div>
            <div>
                <p style={{fontWeight: 'bold'}}>Notes:</p>
                <br />
                <p>Thank you for the Business</p>
                <br />
                <p style={{fontWeight: 'bold'}}>Terms and Conditions</p>
                <br />
                <p>1. Goods once sold cannot be taken back or exchanged.</p>
                <p>2. No returns after sale.</p>
                <p>3. Help is available upon request.</p>
                <p>4. Never once sold cannot be taken back or exchanged.</p>
                <br />
            </div>
        </div>
        </div>
        }
        </>
    );
};

export default Form;