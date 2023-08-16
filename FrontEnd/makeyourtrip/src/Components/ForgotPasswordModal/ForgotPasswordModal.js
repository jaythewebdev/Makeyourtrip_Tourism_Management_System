import React from 'react';
import {Modal } from 'antd';
import Signup from '../Signup/Signup';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
// import Signup from '../Signup/Signup';
import { useState } from 'react';
import OTPModal from '../OTPModal/OTPModal';


const ForgotPasswordModal = ({ onClose }) => {
    const [openOTPModal, setOpenOTPModal] = useState(false);

    const handleOpenOTPModal = () => {
      setOpenOTPModal(true);
    };

    return (
        <>
      <Modal
        title=" "
        footer={null}
        open={true}
        // onOk={onClose}
        onCancel={onClose}
      >
        <ForgotPassword onClose={onClose} 
        // openOTPModal={handleOpenOTPModal}
         />
      </Modal>
    {/* {openOTPModal && <OTPModal onClose={() => setOpenOTPModal(false)} />} */}
</>
    );
  };

export default ForgotPasswordModal;