import React from 'react';
import {Modal } from 'antd';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { useState } from 'react';

const LoginModal = ({ onClose }) => {
  return (
    <Modal title=" " footer={null} open={true} onOk={onClose} onCancel={onClose}>
        <Login/>
    </Modal>
  );
};

export default LoginModal;

// const LoginModal = ({navigate,onCancel}) => {
//   const [selectedComponent, setSelectedComponent] = useState('Login');

//   const navigateToComponent = (componentName) => {
//     setSelectedComponent(componentName);
//   };

//   const renderSelectedComponent = () => {
//     switch (selectedComponent) {
//       case 'Login':
//         return <Login navigate={navigateToComponent} onCancel={onCancel}/>;
//       case 'Signup':
//         return <Signup navigate={navigateToComponent} onCancel={onCancel}/>;
//       // ... render other components similarly
//       default:
//         return null;
//     }
//   };
//   return (
//     <Modal
//       open={true}
//       onCancel={onCancel}
//       footer={null}
//       // width={800}
//       // title="Parent Modal Component"
//     >
//       {renderSelectedComponent()}
//     </Modal>
//   );
// };

// export default LoginModal;

// import React, { useState } from 'react';
// import { Modal } from 'antd';
// import Login from '../Login/Login';
// import Signup from '../Signup/Signup';

// const LoginModal = ({ open, onCancel }) => {
//   const [selectedComponent, setSelectedComponent] = useState('Login');

//   const navigateToComponent = (componentName) => {
//     setSelectedComponent(componentName);
//   };

//   const renderSelectedComponent = () => {
//     switch (selectedComponent) {
//       case 'Login':
//         return <Login navigate={navigateToComponent} onCancel={onCancel} />;
//       case 'Signup':
//         return <Signup navigate={navigateToComponent} onCancel={onCancel} />;
//       // Add cases for other components if needed
//       default:
//         return null;
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onCancel={onCancel}
//       footer={null}
//       width={800}
//       title="Login Modal"
//     >
//       {renderSelectedComponent()}
//     </Modal>
//   );
// };

// export default LoginModal;
