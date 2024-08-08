import React, { useState } from 'react';

function Forgot() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      alert("Recovery email sent");
    }
  };

  return (
    <div className="forgot-modal-overlay">
      <div className="forgot-modal">
        {/* <button className="forgot-close-btn" onClick={()=>console.log('wf')}>
          &times;
        </button> */}
        <div className="forgot-modal-content">
          <img src="https://app.freeinvoicebuilder.com/InvoiceBuilder/img/InvoiceBuilder_CW.Invoice.png?INeLRY_F4sR+RpxpAEBbdQ" alt="Logo" className="forgot-modal-logo" />
          <h2>Forgot password?</h2>
          <p>Enter your email to recover your password</p>
          <form onSubmit={handleSubmit}>
            <div className="forgot-form-group">
              <label htmlFor="forgot-email">Email address <span>*</span></label>
              <input
                type="email"
                id="forgot-email"
                className={emailError ? 'forgot-error' : ''}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="forgot-error-message">{emailError}</p>}
            </div>
            <button type="submit" className="forgot-recovery-btn">Send recovery email</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Forgot;
