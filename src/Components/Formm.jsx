import React, { useState } from 'react';
import { Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import TextField from '@mui/material/TextField';
import { Slider, Input } from 'antd';
import ImgCrop from 'antd-img-crop';
import html2canvas from 'html2canvas';
import axios from "axios"
import jsPDF from 'jspdf';
const { TextArea } = Input;

const Form = () => {
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    invoiceNumber: '',
    customerName: '',
    invoiceDate: '',
    billingAddress: '',
    shippingAddress: '',
    placeToSupply: '',
    gstPercentage: '',
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifsc: '',
      branch: '',
    },
    recipientCompany: '',
    items: [{ itemName: '', mrp: '', sellingPrice: '', qty: '' }],
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      bankDetails: {
        ...prevData.bankDetails,
        [name]: value,
      },
    }));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({ ...formData, items });
  };

  const addTableRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { itemName: '', mrp: '', sellingPrice: '', qty: '' }],
    }));
  };

  const removeTableRow = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });
  };

  const calculateTotal = () => {
    const totalMRP = formData.items.reduce((sum, item) => sum + parseFloat(item.mrp || 0) * parseFloat(item.qty || 0), 0);
    const totalSellingPrice = formData.items.reduce((sum, item) => sum + parseFloat(item.sellingPrice || 0) * parseFloat(item.qty || 0), 0);
    const gst = (totalSellingPrice * parseFloat(formData.gstPercentage || 0)) / 100;
    const totalAmountWithGST = totalSellingPrice + gst;
    return { totalMRP, totalSellingPrice, totalAmountWithGST };
  };

  const { totalMRP, totalSellingPrice, totalAmountWithGST } = calculateTotal();

  const downloadInvoice = () => {
    // Hide the Add Item button and "Remove" buttons during PDF generation
    const addButton = document.querySelector('#addItemButton');
    const removeButtons = document.querySelectorAll('td button');
    
    if (addButton) addButton.style.display = 'none';
    removeButtons.forEach(button => {
        button.style.display = 'none';
    });

    // Replace all input fields with their values
    const inputs = document.querySelectorAll('input, textarea');
    const originalValues = [];

    inputs.forEach(input => {
        originalValues.push(input.outerHTML);
        const span = document.createElement('span');
        span.textContent = input.value;
        span.style.display = 'inline-block'; 
        span.style.width = input.clientWidth + 'px'; 
        span.style.height = input.clientHeight + 'px'; 
        input.replaceWith(span);
    });

    html2canvas(document.querySelector('#invoice'), { useCORS: true, scale: 1.5 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        
        const imgWidth = 595.28; // A4 width in pt
        const pageHeight = 841.89; // A4 height in pt
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Ensure the content fits within a single page
        if (imgHeight <= pageHeight) {
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        } else {
            const scaleRatio = pageHeight / imgHeight;
            const scaledHeight = imgHeight * scaleRatio;
            const scaledWidth = imgWidth * scaleRatio;
            pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
        }

        pdf.save('invoice.pdf');
        const pdfBlob = pdf.output("blob");
 
    const formData = new FormData();
    formData.append("file", pdfBlob, "invoice.pdf");
    formData.append("upload_preset", "invoices");
   
    try {
      axios.post(
          "https://api.cloudinary.com/v1_1/dlo7urgnj/auto/upload",
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          }
      )
      .then(res => {
          const cloudinaryUrl = res.data.secure_url;

          axios.post(
              "https://backend-endpoint.com/api/uploadInvoice", 
              { url: cloudinaryUrl },
              {
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          )
          .then(response => {
              console.log('URL sent to backend:', response.data);
          })
          .catch(error => {
              console.error('Error', error);
          });
      })
      .catch(err => console.log(err));

      if (addButton) addButton.style.display = 'block';
      removeButtons.forEach(button => {
          button.style.display = 'block';
      });

      // Revert the spans back to input fields
      // const spans = document.querySelectorAll('#invoice span');
      // spans.forEach((span, index) => {
      //     const tempDiv = document.createElement('div');
      //     tempDiv.innerHTML = originalValues[index];
      //     span.replaceWith(tempDiv.firstChild);

  } catch (err) {
      console.log(err);
  }
});
};


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
      <div className="Invoice-page" id="invoice">
        <div className="top">
          <div className="top-address">
            <h3 style={{ color: 'rgb(35, 26, 167)', margin: '20px 0px 5px 0px' }}>TAX INVOICE</h3>
            <TextArea
              name="companyName"
              placeholder="Enter Company Name"
              autoSize
              value={formData.companyName}
              onChange={handleChange}
            />
            <div style={{ margin: '24px 0' }} />
            <TextArea
              name="companyAddress"
              placeholder="Company Address"
              autoSize={{ minRows: 2, maxRows: 6 }}
              value={formData.companyAddress}
              onChange={handleChange}
            />
          </div>
          <div className="top-logo">
    <h5 style={{ color: 'rgb(126, 121, 114)' }}>ORIGINAL FOR RECIPIENT</h5>
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '25vw', height: '20vh' }}>
      <Upload
        className='ant-no-border'
        style={{ border: 'none', boxShadow: 'none', borderRadius: '8px' }} // Inline style to remove border and make the image square
        listType="picture-card"
        fileList={fileList}
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
            <p>Invoice #: <span><Input name="invoiceNumber" placeholder="Enter Invoice Number" value={formData.invoiceNumber} onChange={handleChange} /></span></p>
            <br />
            <p>Customer Details:</p>
            <Input name="customerName" placeholder="Enter Customer Name" value={formData.customerName} onChange={handleChange} />
          </div>
          <div>
            <p>Invoice Date: <span style={{ fontWeight: 'bold' }}><Input name="invoiceDate" placeholder="Invoice Date" value={formData.invoiceDate} onChange={handleChange} /></span></p>
            <br />
            <p style={{ fontWeight: 'bold' }} id='billing-address'>Billing address:</p>
            <TextArea
              name="billingAddress"
              placeholder="Enter Billing Address"
              autoSize={{ minRows: 2, maxRows: 6 }}
              value={formData.billingAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <p style={{ fontWeight: 'bold', marginTop: '75px' }} id='shipping-address'>Shipping address:</p>
            <TextArea
              name="shippingAddress"
              placeholder="Enter Shipping Address"
              autoSize={{ minRows: 2, maxRows: 6 }}
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <p>Place to Supply: <span style={{ fontWeight: 'bold' }}><Input name="placeToSupply" placeholder="Enter Place to Supply" value={formData.placeToSupply} onChange={handleChange} /></span></p>
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
              {formData.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><Input name="itemName" value={item.itemName} placeholder="Enter Item" onChange={(e) => handleItemChange(e, index)} /></td>
                  <td><Input type="number" name="mrp" value={item.mrp} placeholder="MRP" onChange={(e) => handleItemChange(e, index)} /></td>
                  <td><Input type="number" name="sellingPrice" value={item.sellingPrice} placeholder="Selling Price" onChange={(e) => handleItemChange(e, index)} /></td>
                  <td><Input type="number" name="qty" value={item.qty} placeholder="Qty" onChange={(e) => handleItemChange(e, index)} /></td>
                  <td>{(parseFloat(item.sellingPrice || 0) * parseFloat(item.qty || 0)).toFixed(2)}</td>
                  <td><Button type="primary" onClick={() => removeTableRow(index)}>remove</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button style={{ marginTop: '10px' }} type='primary' id="addItemButton" onClick={addTableRow}>+Add</Button>
        <div className="total-mrp">
          <div className="total-mrp-det">
            <div className="adjs">
              <p>Total MRP: {totalMRP.toFixed(2)}</p>
              <p>Total Savings: {(totalMRP - totalSellingPrice).toFixed(2)}</p>
              <h3 style={{ margin: '5px 0px 0px 0px' }}>Total: {totalSellingPrice.toFixed(2)}</h3>
            </div>
          </div>
          <div className="hr"></div>
          <div className="total-mrp-det-light">
            <div>
              <p>GST <Input type="number" name="gstPercentage" style={{ width: "5vw" }} placeholder="GST %" value={formData.gstPercentage} onChange={handleChange} /> :</p>
              <p>Total Amount with GST: {totalAmountWithGST.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={{ height: '1.5px', width: '100%', background: 'blue' }}></div>
        <br />
        <div className="footer-price">
        </div>
        <div className="stamp">
          <div className="qr-price">
            <div style={{ width: "20vw" }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Bank Details:</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "end" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Bank Name:</p>
                  <p style={{ fontWeight: 'bold' }}><Input name="bankName" placeholder="Enter Bank Name" value={formData.bankDetails.bankName} onChange={handleBankDetailsChange} /></p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Account # :</p>
                  <p style={{ fontWeight: 'bold' }}><Input name="accountNumber" placeholder="Enter Account Number" value={formData.bankDetails.accountNumber} onChange={handleBankDetailsChange} /></p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>IFSC :</p>
                  <p style={{ fontWeight: 'bold' }}><Input name="ifsc" placeholder="Enter IFSC" value={formData.bankDetails.ifsc} onChange={handleBankDetailsChange} /></p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Branch :</p>
                  <p style={{ fontWeight: 'bold' }}><Input name="branch" placeholder="Enter Branch" value={formData.bankDetails.branch} onChange={handleBankDetailsChange} /></p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p style={{ fontWeight: 'bold', color: '#767070' }}>For <Input name="recipientCompany" style={{ width: "10vw" }} placeholder="Recipient Company" value={formData.recipientCompany} onChange={handleChange} /></p>
            <br />
            {/* <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              onChange={onChanged}
              onPreview={onPreview}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload> */}
          </div>
        </div>
        <div>
          <p style={{ fontWeight: 'bold' }}>Notes:</p>
          <br />
          <p>Thank you for the Business</p>
          <br />
          <p style={{ fontWeight: 'bold' }}>Terms and Conditions</p>
          <br />
          <p>1. Goods once sold cannot be taken back or exchanged.</p>
          <p>2. No returns after sale.</p>
          <p>3. Help is available upon request.</p>
          <p>4. Never once sold cannot be taken back or exchanged.</p>
          <br />
        </div>
      </div>
      <Button style={{ width: "10vw", marginBottom: "15px",borderRadius:"10px" }} type='primary' onClick={downloadInvoice}>Generate Invoice</Button>
    </div>
  );
};

export default Form;
