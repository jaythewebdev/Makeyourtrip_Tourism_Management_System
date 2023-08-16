import React, { useState, useEffect, useRef } from 'react';
import '../OTPVerification/OTPVerification.css'
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';

function OTPVerification() {
    const[getChangePasswordModal,setgetChangePasswordModal]=useState(false);

    const handleGetChangePasswordModal = () => {
        setgetChangePasswordModal(true);
        // onClose(); // Close the ForgotPasswordModal
        // openOTPModal(); // Open the OTPModal
      };
      const handleCloseOTPModal = () => {
        setgetChangePasswordModal(false);
      };

  const inputsRef = useRef([]);
  const [activeButton, setActiveButton] = useState(false);
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = (event.clipboardData || window.clipboardData).getData('text');
    const otpLength = inputsRef.current.length;

    for (let i = 0; i < otpLength; i++) {
      if (i < pastedValue.length) {
        inputsRef.current[i].value = pastedValue[i];
        inputsRef.current[i].removeAttribute('disabled');
        inputsRef.current[i].focus();
      } else {
        inputsRef.current[i].value = ''; // Clear any remaining inputs
        inputsRef.current[i].focus();
      }
    }
  };

  const handleKeyUp = (index, e) => {
    const currentInput = inputsRef.current[index];
    const nextInput = inputsRef.current[index + 1];
    const prevInput = inputsRef.current[index - 1];

    if (currentInput.value.length > 1) {
      currentInput.value = '';
      return;
    }
    if (currentInput.value.length === 1) {
        if (nextInput) {
          nextInput.removeAttribute('disabled');
          nextInput.focus();
        }
      }

    if (nextInput && nextInput.hasAttribute('disabled') && currentInput.value !== '') {
      nextInput.removeAttribute('disabled');
      nextInput.focus();
    }

    if (e.key === 'Backspace') {
      inputsRef.current.forEach((input, index2) => {
        if (index <= index2 && prevInput) {
          input.setAttribute('disabled', true);
          input.value = '';
          prevInput.focus();
        }
      });
    }

    setActiveButton(false);

    const inputsNo = inputsRef.current.length;
    if (!inputsRef.current[inputsNo - 1].disabled && inputsRef.current[inputsNo - 1].value !== '') {
      setActiveButton(true);
    }
  };

  const handleSubmit = () => {
    // Handle verification logic here
    console.log('Verification submitted');
  };

  return (
    <div className="container-fluid bg-body-tertiary d-block">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: '500px' }}>
          <div className="card bg-white border-0" style={{ boxShadow: '0 12px 15px rgba(0, 0, 0, 0.02)' }}>
            <div className="card-body text-center" style={{height:"19rem"}}>
              <h4>Verify</h4>
              <p>Your code was sent to you via email</p>

              <div className="otp-field mb-4">
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    type="number"
                    ref={(el) => (inputsRef.current[index] = el)}
                    onPaste={handlePaste}
                    onKeyUp={(e) => handleKeyUp(index, e)}
                    className="otp-input"
                  />
                ))}
              </div>

              <button className={`btn btn-primary mb-3 ${activeButton ? 'active' : ''}`} disabled={!activeButton} onClick={handleGetChangePasswordModal}
>
                Verify
              </button>
              {getChangePasswordModal && <ChangePasswordModal onClose={handleCloseOTPModal} />}


              <p className="resend text-muted mb-0">
                Didn't receive code? <a href="">Request again</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
