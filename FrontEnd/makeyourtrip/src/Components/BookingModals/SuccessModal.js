// import React from 'react';
// import { Modal, Box, Typography } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
//   textAlign: 'center',
// };

// const SuccessModal = ({ onClose }) => {


//   return (
//     <Modal
//       open={true}
//       onClose={onClose}
//       aria-labelledby="otp-modal-title"
//       aria-describedby="otp-modal-description"
//     >
//       <Box sx={{ ...style }}>
//         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
//           <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 24 24" width="64" fill="#00B300">
//             <path d="M0 0h24v24H0V0z" fill="none" />
//             <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
//           </svg>
//         </div>
//         <Typography variant="h5">Tour Package Booked Successfully</Typography>
//       </Box>
//     </Modal>
//   );
// };

// export default SuccessModal;

import React from 'react';
import { Modal, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const SuccessModal = ({ visible, onClose }) => {

  const navigate=useNavigate();

  const handleOk=()=>{
    localStorage.removeItem("bookedCapacity");
    onClose();
    navigate("/tourpage/bookingpage/ticket");
  }
  return (
    <Modal
      open={true}
onCancel={onClose}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          Ok
        </Button>
      ]}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 24 24" width="64" fill="#00B300">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
      </div>
      <Typography.Title level={4}>Tour Package Booked Successfully</Typography.Title>
    </Modal>
  );
};

export default SuccessModal;

