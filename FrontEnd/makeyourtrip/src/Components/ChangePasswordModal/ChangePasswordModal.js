import React from 'react';
import {Modal } from 'antd';
import Signup from '../Signup/Signup';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
// import Signup from '../Signup/Signup';
import { useState } from 'react';
import OTPModal from '../OTPModal/OTPModal';
import ChangePassword from '../ChangePassword/ChangePassword';


const ChangePasswordModal = ({ onClose }) => {

    return (
        <>
      <Modal
        title=" "
        footer={null}
        open={true}
        // onOk={onClose}
        onCancel={onClose}
      >
        <ChangePassword onClose={onClose} 
         />
      </Modal>
</>
    );
  };

export default ChangePasswordModal;