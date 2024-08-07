import React, {  useState } from 'react';

const Form = () => {
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
    
        // Helper function to convert a number less than 1000 to words
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
    
        let words = '';
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
    
    

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('formData'));
    //     if (data) {
    //         setFormData(data);
    //     }
    // }, []);

    if (!formData) return null;

    const totalMRP = formData.items.reduce((sum, item) => sum + parseFloat(item.mrp) * parseInt(item.qty), 0);
    const totalAmount = formData.items.reduce((sum, item) => sum + parseFloat(item.selling_price) * parseInt(item.qty), 0);
    const totalSavings = totalMRP - totalAmount;
    const totalQty = formData.items.reduce((sum, item) => sum + parseInt(item.qty), 0);
    const taxableAmount = totalAmount / 1.12;
    const cgst = taxableAmount * 0.06;
    const sgst = taxableAmount * 0.06;

    
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
        // localStorage.setItem('formData', JSON.stringify(formData));
        // window.location.href = 'invoice.html';
    };

    return (
        <>{!invoice && 
        <div className="form-container">
            <div className="form-header">
                <h2>Customer Invoice Details Form</h2>
            </div>
            <form id="item-form">
                <div className="customer-info">
                    <input
                        type="text"
                        placeholder="Customer Name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                    />
                    <textarea
                        placeholder="Billing Address"
                        name="billing_address"
                        value={formData.billing_address}
                        onChange={handleChange}
                    />
                    <textarea
                        placeholder="Shipping Address"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleChange}
                    />
                </div>
                <div id="items-container">
                    {formData.items.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="item-selection">
                                <p>Item Details</p>
                                <button type="button" onClick={() => removeItemRow(index)}>remove</button>
                            </div>
                            <div className="item-row">
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    name={`item_name-${index}`}
                                    value={item.item_name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    placeholder="MRP"
                                    name={`mrp-${index}`}
                                    value={item.mrp}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    placeholder="Selling Price"
                                    name={`selling_price-${index}`}
                                    value={item.selling_price}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    name={`qty-${index}`}
                                    value={item.qty}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="add-item-btn">
                    <button type="button" onClick={addItemRow}>Add Item</button>
                    <p>Total Items - {count}</p>
                </div><br />
                <div className="submit-btn">
                    <button type="button" onClick={submitForm}>Generate Invoice</button>
                    { preview && <button type="button">Preview</button>}
                </div>
            </form>
        </div>
        }

        {invoice && 

        <div className="Invoice-page" id="invoice">
            <div className="top">
                <div className="top-address">
                    <h3 style={{color: 'rgb(35, 26, 167)', margin: '20px 0px 5px 0px'}}>TAX INVOICE</h3>
                    <h2 style={{margin: '0px 0px 5px 0px'}}>VTS ENTERPRISES</h2>
                    <h5 style={{margin: '0px 0px 5px 0px'}}>GSTIN 36AACCG0527D2Z4</h5>
                    <p>19 Washington Square N<br/>New York,<br/>NY 10011,<br/>USA</p>
                </div>
                <div className="top-logo">
                    <h5 style={{color: 'rgb(126, 121, 114)'}}>ORIGINAL FOR RECIPIENT</h5>
                    <div style={{display: 'flex'}}>
                        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo Goes Here" />
                        <p style={{fontSize: '100px', color: 'rgb(113, 172, 201)'}}>VTS</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="addresses">
                <div>
                    <p>Invoice #: <span style={{fontWeight: 'bold'}}>INV-14</span></p>
                    <br />
                    <p>Customer Details:</p>
                    <p style={{fontWeight: 'bold'}} id='customer-name'>{formData.customer_name}</p>
                </div>
                <div>
                    <p>Invoice Date: <span style={{fontWeight: 'bold'}}>05 Aug 2024</span></p>
                    <br />
                    <p style={{fontWeight: 'bold'}} id='billing-address'>Billing address:</p>
                    <p>{formData.billing_address}</p>
                </div>
                <div>
                    <p>&nbsp;</p>
                    <br />
                    <p style={{fontWeight: 'bold'}} id='shipping-address' >Shipping address:</p>
                    <p>{formData.shipping_address}</p>
                </div>
            </div>
            <br />
            <p>Place to Supply: <span style={{fontWeight: 'bold'}}>27-MAHARASTRA</span></p>
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
                    <tbody>
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
                    </tbody>
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
                        <p>Taxable Amount:</p>
                        <p>CGST 6.0%:</p>
                        <p>SGST 6.0%:</p>
                    </div>
                    <div>
                        <p>₹ {taxableAmount.toFixed(2)}</p>
                        <p>₹ {cgst.toFixed(2)}</p>
                        <p>₹ {sgst.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="price-words">
                <p>Total Items / Qty: <span>{formData.items.length}</span> / <span>{totalQty}</span></p>
                <p>Total amount (in words): <span>INR {numberToWords(totalAmount.toFixed(2))} only</span></p>
            </div>
            <br />
            <div style={{height: '1.5px', width: '100%', background: 'blue'}}></div>
            <br />
            <div className="footer-price">
                <p>Amount Payable: ₹ <span>{totalAmount.toFixed(2)}</span></p>
            </div>
            <div className="stamp">
                <div className="qr-price"> 
                    <div>
                        <p style={{fontWeight: 'bold'}}>Pay using UPI:</p>
                        <img style={{height: '100px', width: '100px'}} src={process.env.PUBLIC_URL + '/images/temp-qr.png'} alt="QR" />
                    </div>
                    <div>
                        <p style={{fontWeight: 'bold'}}>Bank Details:</p>
                        <p>Bank:</p>
                        <p>Account #:</p>
                        <p>IFSC:</p>
                        <p>Branch:</p>
                    </div>
                    <div>
                        <p>&nbsp;</p>
                        <p style={{fontWeight: 'bold'}}>Yes Bank</p>
                        <p style={{fontWeight: 'bold'}}>45568437589</p>
                        <p style={{fontWeight: 'bold'}}>YES7548</p>
                        <p style={{fontWeight: 'bold'}}>Kodihalli</p>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p style={{fontWeight: 'bold', color: '#767070'}}>For VTS</p>
                    <br />
                    <img height="100px" width="110px" src={process.env.PUBLIC_URL + '/images/signature.png'} alt="Stamp" />
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
        }
        </>
    );
};

export default Form;
