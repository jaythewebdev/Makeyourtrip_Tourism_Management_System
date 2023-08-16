// LoginModal.js
import React from 'react';
import {Modal } from 'antd';
import Login from '../Login/Login';
import OTPVerification from '../OTPVerification/OTPVerification';

const OTPModal = ({ onClose }) => {
  return (
    <Modal title=" " footer={null} open={true} onCancel={onClose}>
        <OTPVerification onClose={onClose}/>
    </Modal>
  );
};

export default OTPModal;
