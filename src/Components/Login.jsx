import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    }

    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      valid = false;
    }

    if (valid) {
      console.log("Login successful");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="login-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="login-modal-content">
          <img src="https://app.freeinvoicebuilder.com/InvoiceBuilder/img/InvoiceBuilder_CW.Invoice.png?INeLRY_F4sR+RpxpAEBbdQ" alt="Logo" className="login-modal-logo" />
          <h2>Invoice builder login</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="login-email">Email address <span>*</span></label>
              <input
                type="email"
                id="login-email"
                className={emailError ? 'login-error' : ''}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="login-error-message">{emailError}</p>}
            </div>
            <div className="login-form-group">
              <label htmlFor="login-password">Password <span>*</span></label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className={passwordError ? 'login-error' : ''}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="toggle-password" onClick={toggleShowPassword}>
                  {showPassword ? <>&#128065;</> : <>&#128065;</>}
                </span>
              </div>
              {passwordError && <p className="login-error-message">{passwordError}</p>}
            </div>
            <div className="login-form-actions">
              <div className="login-remember-me">
                <input type="checkbox" id="login-remember-me" />
                <label htmlFor="login-remember-me">Remember me</label>
              </div>
              <button type="button" className="login-forgot-password" onClick={() => navigate('/forgot')}>Forgot password?</button>
            </div>
            <button type="submit" className="login-login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
