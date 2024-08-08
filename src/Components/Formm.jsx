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

    const [count, setCount] = useState(1);
    const [formData, setFormData] = useState({
        customer_name: '',
        billing_address: '',
        shipping_address: '',
        items: [{ item_name: '', mrp: '', selling_price: '', qty: '' }],
    });
    const [tableData,settableData]=useState({
        items: [{item_name: '', mrp: '', selling_price: '', qty: ''}],
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
    
    


    
    const addTableRow=()=>{
        
        settableData({
            ...tableData,
            items:[...tableData.items, {item_name: '', mrp: '', selling_price: '', qty: ''}]
        })
        setCount(count + 1);
        
    }
    


    const removeTableRow=(indexs)=>{
        const newRow=tableData.items.filter((_, i) => i !== indexs);
        settableData({...tableData,items:newRow});
        setCount(count-1);
    }



    return (
        <>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"10px"}}>
        <div className="Invoice-page" id="invoice">
            <div className="top">
                <div className="top-address">
                    <h3 style={{color: 'rgb(35, 26, 167)', margin: '20px 0px 5px 0px'}}>TAX INVOICE</h3>
                    <TextArea placeholder="Enter Company Name" autoSize />
                        <div
                            style={{
                            margin: '24px 0',
                            }}
                        />
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
                        onChange={onChanged}
                        onPreview={onPreview}
                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="addresses">
                <div>
                    <p>Invoice #: <span><Input placeholder="Enter Invoice Number" /></span></p>
                    
                    <br />
                    <p>Customer Details:</p>
                    <Input placeholder="Enter Customer Name" />
                </div>
                <div>
                    <p>Invoice Date: <span style={{fontWeight: 'bold'}}><Input placeholder="Invoice Date" /></span></p>
                    <br />
                    <p style={{fontWeight: 'bold'}} id='billing-address'>Billing address:</p>
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
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr className="tabletop">
                        <th>#</th>
                        <th className="tabletop">Item</th>
                        <th className="tabletop" width="100px">MRP</th>
                        <th className="tabletop" width="100px">Selling Price</th>
                        <th className="tabletop">Qty</th>
                        <th className="tabletop" width="100px">Amount</th>
                    </tr>
                    {tableData.items.map((item, indexs) => (
                    <tr key={indexs}>
                        <td>{indexs+1}</td>
                        <td><Input name={`item_name-${indexs}`}  value={item.item_name} placeholder="Enter Item " /></td>
                        <td><Input name={`mrp-${indexs}`}
                                    value={item.mrp} placeholder="MRP" /></td>
                        <td><Input name={`selling_price-${indexs}`}
                                    value={item.selling_price} placeholder="Selling Price" /></td>
                        <td><Input name={`qty-${indexs}`}
                                    value={item.qty} placeholder="Qty" /></td>
                        <td>'Amount'</td>
                        <td><Button type="primary" onClick={() => removeTableRow(indexs)}>remove</Button></td>
                    </tr>

                    ))}
                </tbody>
            </table>
            </div>
            <Button style={{marginTop:"10px"}} type='primary' onClick={addTableRow}>+Add</Button>
            <div className="total-mrp">
                <div className="total-mrp-det"> 
                    <div className="adjs">
                        <p>Total MRP:</p>
                        <p>Total Savings:</p>
                        <h3 style={{margin: '5px 0px 0px 0px'}}>Total:</h3>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className="hr"></div>
                <div className="total-mrp-det-light">
                    <div>
                        <p>GST <Input style={{width:"5vw"}} placeholder="GST %" /> :</p>
                        <p>Total Amount with GST:</p>
                    </div>
                    <div>
                       
                    </div>
                </div>
            </div>
            <br />
            <div className="price-words">
               
            </div>
            <br />
            <div style={{height: '1.5px', width: '100%', background: 'blue'}}></div>
            <br />
            <div className="footer-price">
            </div>
            <div className="stamp">
                <div className="qr-price"> 
                    
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
                 
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p style={{fontWeight: 'bold', color: '#767070'}}>For <Input style={{width:"10vw"}} placeholder="Recepient Company" /></p>
                    <br />
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        onChange={onChanged}
                        onPreview={onPreview}
                    >
                        {fileList.length < 1 && '+ Upload'}
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
        <Button style={{width:"20vw",marginBottom:"20px"}} type='primary'>Generate Invoice</Button>
        </div>

        </>
    );
};

export default Form;