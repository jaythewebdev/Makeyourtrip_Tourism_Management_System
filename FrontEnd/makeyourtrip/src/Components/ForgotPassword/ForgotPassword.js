import { useState } from 'react';
import '../Login/Login.css';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';
import OTPModal from '../OTPModal/OTPModal';

  const ForgotPassword = ({}) => {
  
    const[getOTP,setGetOTP]=useState(false);

    const handleGetOTP = () => {
        setGetOTP(true);
        // onClose(); // Close the ForgotPasswordModal
        // openOTPModal(); // Open the OTPModal
      };
    
      const handleCloseOTPModal = () => {
        setGetOTP(false);
      };

  return (
    <div className="login-wrapper">
<div className="login-title-text">
        <div className="login-title">
        </div>
      </div>
      <div className="login-form-container">
        <div>  
          <h2 style={{textAlign:"center",marginTop:"0.7rem"}}>Forgot Password</h2>
             
        </div>
        <div className="login-form-inner">
          <form action="#" className="login-form">
            <div className="login-field">
            <input type="email" placeholder="Email" required />
          </div>
            <div className="login-field my-login-btn">
              <div className="login-btn-layer"></div>
              <input type="submit" value="Get OTP" onClick={handleGetOTP}
/>
            </div>
            {getOTP && <OTPModal onClose={handleCloseOTPModal} />}
            <div className='login-footer' style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",height:"3rem"}}>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;




