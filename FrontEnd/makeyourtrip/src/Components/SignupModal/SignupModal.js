// LoginModal.js
import React from 'react';
import {Modal } from 'antd';
import Signup from '../Signup/Signup';

const SignupModal = ({ onClose }) => {
  return (
    <Modal title="" width={550} footer={null} visible={true} onCancel={onClose} maskClosable>
           <div onMouseLeave={onClose}>
        <Signup />
        {/* <button onClick={onClose}>Close</button> */}
      </div>
        {/* <Signup /> */}
    </Modal>
  );
};

export default SignupModal;
