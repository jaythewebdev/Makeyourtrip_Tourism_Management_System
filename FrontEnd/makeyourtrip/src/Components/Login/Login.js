
import { useState } from "react";
import "./Login.css";
import SignupModal from "../SignupModal/SignupModal";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
import { Popup } from "reactjs-popup";
import { Modal } from "antd";
import Signup from "../Signup/Signup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  var [Login, setLogin] = useState({
    emailId: "",
    password: "",
  });
  var login = (event) => {
    event.preventDefault();
    fetch("http://localhost:5279/api/User/Login", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...Login }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        if (myData.role === "Admin") {
          localStorage.setItem("userId", myData.id); // Modify the property name here
          localStorage.setItem("role", myData.role);
          localStorage.setItem("token", myData.token);
          localStorage.setItem("emailId", myData.emailId);
          localStorage.setItem("status", myData.status);
          navigate("/AdminProfile"); // in navigate give your path
          toast.success(" Login successful");
        } else if (myData.role === "TravelAgent" && myData.status==="Approved" && myData.token!==null) {
          localStorage.setItem("userId", myData.id); // Modify the property name here
          localStorage.setItem("role", myData.role);
          localStorage.setItem("token", myData.token);
          localStorage.setItem("emailId", myData.emailId);
          localStorage.setItem("status", myData.status);
          navigate("/AgentProfile"); // in navigate give your path
          toast.success("Login successful");
        }
        else if (myData.role === "TravelAgent" && myData.status==="UnApproved" && myData.token===null) {
          toast.success("Sorry you are yet to be approved .");
          navigate("/"); // in navigate give your path
      }
        else if (myData.role === "Traveller") {
          localStorage.setItem("userId", myData.id); // Modify the property name here
          localStorage.setItem("role", myData.role);
          localStorage.setItem("token", myData.token);
          localStorage.setItem("emailId", myData.emailId);
          localStorage.setItem("status", myData.status);
          navigate("/");
          toast.success(" Login successful");
        }
        else {
          navigate("/");
          toast.error("error");
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  };
  const [isLogin, setIsLogin] = useState(true);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setisForgotPasswordModalOpen] = useState(false);

  const handleSignupButtonClick = () => {
    // setIsSignupModalOpen(true);
    // props.closeLogin(true);
  };

  const handleForgotPasswordButtonClick = () => {
    setisForgotPasswordModalOpen(true);
  };
  const closeSignup = () => {
    setIsSignupModalOpen(true);
  };

  const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const[emailToggle,setEmailToggle]=useState(false);

  const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const[passwordToggle,setPasswordToggle]=useState(false);


  return (
    <div className="login-wrapper">
      {/* <div> */}
      <div className="login-title-text">
        <div
          className={`login-title ${
            isLogin ? "login-form-title" : "signup-form-title"
          }`}
        >
          {isLogin ? "Login Form" : "Login Form"}
        </div>
      </div>
      <div className="login-form-container">
        {/* <div className="login-slide-controls"> */}
        <div>
          <h2 style={{ textAlign: "center", marginTop: "0.7rem" }}>
            Welcome Back!
          </h2>
        </div>
        <div
          className={`login-form-inner ${
            isLogin ? "login-form" : "signup-form"
          }`}
        >
          <form
            action="#"
            className={`login-form ${isLogin ? "login" : "signup"}`}
          >
            {isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  onChange={(event) => {
                    setLogin({
                      ...Login,
                      emailId: event.target.value,
                    });
                    emailRegex.test(Login.emailId)?setEmailToggle(false):setEmailToggle(true);
                  }}

                />
                {emailToggle && <p>Enter a valid email</p>}
              </div>
            )}
            <div className="login-field">
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(event) => {
                  setLogin({
                    ...Login,
                    password: event.target.value,
                  });
                  passwordRegex.test(Login.password)?setPasswordToggle(false):setPasswordToggle(true);

                }}
              />
              {passwordToggle && <p>At least one letter and one number</p>}

            </div>
            <div className="login-field my-login-btn">
              <div className="login-btn-layer"></div>
              <input
                type="submit"
                onClick={login}
                value={isLogin ? "Login" : "Login"}
              />
            </div>
            <div
              className="login-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                height: "3rem",
              }}
            >
              {isLogin && (
                <div className="login-pass-link">
                  <a href="#" onClick={handleForgotPasswordButtonClick}>
                    Forgot password?
                  </a>
                  {/* {isForgotPasswordModalOpen && <ForgotPasswordModal onClose={() => setisForgotPasswordModalOpen(false)} />}        */}
                </div>
              )}
              {isLogin && (
                <div className="login-signup-link">
                  Not a member?{" "}
                  <span
                    className="signup-link"
                    onClick={handleSignupButtonClick}
                  >
                    Signup now
                  </span>
                  {/* <Popup trigger={<span className='signup-link' onClick={handleSignupButtonClick}>Signup now</span>} modal nested>
                  {
                    close=>(
                      <div>
                        <SignupModal onClose={closeSignup}/>
                        {
                          isSignupModalOpen && close()
                        }
                      </div>
                    )
                  }
                </Popup> */}
                  {/* <Modal
                    title=" "
                    width={550}
                    footer={null}
                    open={isSignupModalOpen}
                    onOk={onClose}
                    onCancel={onClose}
                  >
                    <Signup onClose={closeSignup} />
                  </Modal> */}
                  {/* {isSignupModalOpen && <SignupModal onClose={() => setIsSignupModalOpen(false)} />}        */}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Login;

// import { useState } from 'react';
// import './Login.css';
// import SignupModal from '../SignupModal/SignupModal';
// import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';
// import Signup from '../Signup/Signup';

//   const Login = ({navigate,onCancel}) => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [visible, setVisible] = useState(true);

//     const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
//     const [isForgotPasswordModalOpen, setisForgotPasswordModalOpen] = useState(false);

//     const handleSignupButtonClick
//     = () => {
//       // setIsSignupModalOpen(true);
//       onCancel()
//       navigate('Login')
//     };

//     const handleForgotPasswordButtonClick
//     = () => {
//       // setisForgotPasswordModalOpen(true);
//       navigate('Signup',true)
//     };

//   return (
//     <div className="login-wrapper">
//   {/* <div> */}
// <div className="login-title-text">
//         <div className={`login-title ${isLogin ? 'login-form-title' : 'signup-form-title'}`}>
//           {isLogin ? 'Login Form' : 'Login Form'}
//         </div>
//       </div>
//       <div className="login-form-container">
//         {/* <div className="login-slide-controls"> */}
//         <div>
//           <h2 style={{textAlign:"center",marginTop:"0.7rem"}}>Welcome Back!</h2>
//         </div>
//         <div className={`login-form-inner ${isLogin ? 'login-form' : 'signup-form'}`}>
//           <form action="#" className={`login-form ${isLogin ? 'login' : 'signup'}`}>
//           {isLogin && (
//             <div className="login-field">
//             <input type="text" placeholder="Email Address" required />
//           </div>
//             )}
//             {!isLogin && (
//             <div className="login-field">
//             <input type="password" placeholder="PhoneNumber" required />
//           </div>
//             )}
//             <div className="login-field">
//               <input type="password" placeholder="Password" required />
//             </div>
//             <div className="login-field my-login-btn">
//               <div className="login-btn-layer"></div>
//               <input type="submit" value={isLogin ? 'Login' : 'Signup'} />
//             </div>
//             <div className='login-footer' style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",height:"3rem"}}>
// {isLogin && (
//   <div className="login-pass-link">
//     <a href="#" onClick={handleForgotPasswordButtonClick}>Forgot password?</a>
//   </div>
// )}
// {isLogin && (
//   <div className="login-signup-link">
//     Not a member? <span className='signup-link' onClick={handleSignupButtonClick}>Signup now</span>
//   </div>
// )}

//           </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default Login;


// import { useState } from "react";
// import "./Login.css";
// import SignupModal from "../SignupModal/SignupModal";
// import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
// import { Popup } from "reactjs-popup";
// import { Modal } from "antd";
// import Signup from "../Signup/Signup";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = ({ onClose }) => {
//   const navigate = useNavigate();
//   var [Login, setLogin] = useState({
//     emailId: "",
//     password: "",
//   });
//   var login = (event) => {
//     event.preventDefault();
//     fetch("http://localhost:5279/api/User/Login", {
//       method: "POST",
//       headers: {
//         accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...Login }),
//     })
//       .then(async (data) => {
//         var myData = await data.json();
//         console.log(myData);
//         if (myData.role === "Admin") {
//           localStorage.setItem("userId", myData.id); // Modify the property name here
//           localStorage.setItem("role", myData.role);
//           localStorage.setItem("token", myData.token);
//           localStorage.setItem("emailId", myData.emailId);
//           localStorage.setItem("status", myData.status);
//           navigate("/AdminProfile"); // in navigate give your path
//           toast.success(" Login successful");
//         } else if (myData.role === "TravelAgent" && myData.status==="Approved" && myData.token!==null) {
//           localStorage.setItem("userId", myData.id); // Modify the property name here
//           localStorage.setItem("role", myData.role);
//           localStorage.setItem("token", myData.token);
//           localStorage.setItem("emailId", myData.emailId);
//           localStorage.setItem("status", myData.status);
//           navigate("/AgentProfile"); // in navigate give your path
//           toast.success("Login successful");
//         }
//         else if (myData.role === "TravelAgent" && myData.status==="UnApproved" && myData.token===null) {
//           toast.success("Sorry you are yet to be approved .");
//           navigate("/"); // in navigate give your path
//       }
//         else if (myData.role === "Traveller") {
//           localStorage.setItem("userId", myData.id); // Modify the property name here
//           localStorage.setItem("role", myData.role);
//           localStorage.setItem("token", myData.token);
//           localStorage.setItem("emailId", myData.emailId);
//           localStorage.setItem("status", myData.status);
//           navigate("/");
//           toast.success(" Login successful");
//         }
//         else {
//           navigate("/");
//           toast.error("error");
//         }
//       })
//       .catch((err) => {
//         console.log(err.error);
//       });
//   };
//   const [isLogin, setIsLogin] = useState(true);
//   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
//   const [isForgotPasswordModalOpen, setisForgotPasswordModalOpen] = useState(false);

//   const handleSignupButtonClick = () => {
//     // setIsSignupModalOpen(true);
//     // props.closeLogin(true);
//   };

//   const handleForgotPasswordButtonClick = () => {
//     setisForgotPasswordModalOpen(true);
//   };
//   const closeSignup = () => {
//     setIsSignupModalOpen(true);
//   };

//   const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   const[emailToggle,setEmailToggle]=useState(false);


//   return (
//     <div className="login-wrapper">
//       {/* <div> */}
//       <div className="login-title-text">
//         <div
//           className={`login-title ${
//             isLogin ? "login-form-title" : "signup-form-title"
//           }`}
//         >
//           {isLogin ? "Login Form" : "Login Form"}
//         </div>
//       </div>
//       <div className="login-form-container">
//         {/* <div className="login-slide-controls"> */}
//         <div>
//           <h2 style={{ textAlign: "center", marginTop: "0.7rem" }}>
//             Welcome Back!
//           </h2>
//         </div>
//         <div
//           className={`login-form-inner ${
//             isLogin ? "login-form" : "signup-form"
//           }`}
//         >
//           <form
//             action="#"
//             className={`login-form ${isLogin ? "login" : "signup"}`}
//           >
//             {isLogin && (
//               <div className="login-field">
//                 <input
//                   type="text"
//                   placeholder="Email Address"
//                   required
//                   error={emailRegex.test(Login.emailId)?(setEmailToggle(true)):setEmailToggle(false)}
//                   onChange={(event) => {
//                     setLogin({
//                       ...Login,
//                       emailId: event.target.value,
//                     });
//                   }}
//                 />
//                 { emailToggle &&
//                     <p>*Enter valid email</p>
//                 }
//               </div>
//             )}
//             <div className="login-field">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 onChange={(event) => {
//                   setLogin({
//                     ...Login,
//                     password: event.target.value,
//                   });
//                 }}
//               />
//             </div>
//             <div className="login-field my-login-btn">
//               <div className="login-btn-layer"></div>
//               <input
//                 type="submit"
//                 onClick={login}
//                 value={isLogin ? "Login" : "Login"}
//               />
//             </div>
//             <div
//               className="login-footer"
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "flex-end",
//                 height: "3rem",
//               }}
//             >
//               {isLogin && (
//                 <div className="login-pass-link">
//                   <a href="#" onClick={handleForgotPasswordButtonClick}>
//                     Forgot password?
//                   </a>
//                   {/* {isForgotPasswordModalOpen && <ForgotPasswordModal onClose={() => setisForgotPasswordModalOpen(false)} />}        */}
//                 </div>
//               )}
//               {isLogin && (
//                 <div className="login-signup-link">
//                   Not a member?{" "}
//                   <span
//                     className="signup-link"
//                     onClick={handleSignupButtonClick}
//                   >
//                     Signup now
//                   </span>
//                   {/* <Popup trigger={<span className='signup-link' onClick={handleSignupButtonClick}>Signup now</span>} modal nested>
//                   {
//                     close=>(
//                       <div>
//                         <SignupModal onClose={closeSignup}/>
//                         {
//                           isSignupModalOpen && close()
//                         }
//                       </div>
//                     )
//                   }
//                 </Popup> */}
//                   {/* <Modal
//                     title=" "
//                     width={550}
//                     footer={null}
//                     open={isSignupModalOpen}
//                     onOk={onClose}
//                     onCancel={onClose}
//                   >
//                     <Signup onClose={closeSignup} />
//                   </Modal> */}
//                   {/* {isSignupModalOpen && <SignupModal onClose={() => setIsSignupModalOpen(false)} />}        */}
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default Login;

// // import { useState } from 'react';
// // import './Login.css';
// // import SignupModal from '../SignupModal/SignupModal';
// // import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';
// // import Signup from '../Signup/Signup';

// //   const Login = ({navigate,onCancel}) => {
// //     const [isLogin, setIsLogin] = useState(true);
// //     const [visible, setVisible] = useState(true);

// //     const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
// //     const [isForgotPasswordModalOpen, setisForgotPasswordModalOpen] = useState(false);

// //     const handleSignupButtonClick
// //     = () => {
// //       // setIsSignupModalOpen(true);
// //       onCancel()
// //       navigate('Login')
// //     };

// //     const handleForgotPasswordButtonClick
// //     = () => {
// //       // setisForgotPasswordModalOpen(true);
// //       navigate('Signup',true)
// //     };

// //   return (
// //     <div className="login-wrapper">
// //   {/* <div> */}
// // <div className="login-title-text">
// //         <div className={`login-title ${isLogin ? 'login-form-title' : 'signup-form-title'}`}>
// //           {isLogin ? 'Login Form' : 'Login Form'}
// //         </div>
// //       </div>
// //       <div className="login-form-container">
// //         {/* <div className="login-slide-controls"> */}
// //         <div>
// //           <h2 style={{textAlign:"center",marginTop:"0.7rem"}}>Welcome Back!</h2>
// //         </div>
// //         <div className={`login-form-inner ${isLogin ? 'login-form' : 'signup-form'}`}>
// //           <form action="#" className={`login-form ${isLogin ? 'login' : 'signup'}`}>
// //           {isLogin && (
// //             <div className="login-field">
// //             <input type="text" placeholder="Email Address" required />
// //           </div>
// //             )}
// //             {!isLogin && (
// //             <div className="login-field">
// //             <input type="password" placeholder="PhoneNumber" required />
// //           </div>
// //             )}
// //             <div className="login-field">
// //               <input type="password" placeholder="Password" required />
// //             </div>
// //             <div className="login-field my-login-btn">
// //               <div className="login-btn-layer"></div>
// //               <input type="submit" value={isLogin ? 'Login' : 'Signup'} />
// //             </div>
// //             <div className='login-footer' style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",height:"3rem"}}>
// // {isLogin && (
// //   <div className="login-pass-link">
// //     <a href="#" onClick={handleForgotPasswordButtonClick}>Forgot password?</a>
// //   </div>
// // )}
// // {isLogin && (
// //   <div className="login-signup-link">
// //     Not a member? <span className='signup-link' onClick={handleSignupButtonClick}>Signup now</span>
// //   </div>
// // )}

// //           </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //     // </div>
// //   );
// // };

// // export default Login;