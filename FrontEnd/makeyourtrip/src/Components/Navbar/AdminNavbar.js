
import React, { useState, useEffect } from "react";
import "../LandingPage/LandingPage.css";
import { FaBars } from "react-icons/fa";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import { Menu, Dropdown, Space } from "antd";

// import Dropdown from "antd/es/dropdown/dropdown";
import { DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const [showList, setShowList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  //   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [toggle, setToggle] = useState(false);

  // const handleLoginButtonClick = () => {
  //   // setIsLoginModalOpen(true);
  //   setToggle(!toggle);
  // };
  // const handleSignupButtonClick = () => {
  //   setIsSignupModalOpen(true);
  // };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  useEffect(() => {
    // Check local storage for user ID or any other condition to determine login status
    const userId = localStorage.getItem("userId"); // Replace with your condition
    setIsLoggedIn(!!userId); // Update login status based on condition
  });

  const handleNavClick = () => {
    setShowList(!showList);
  };


  const handleLoginButtonClick = () => {
    // setToggle(!toggle);
   setIsLoginModalOpen(true);

  };

  const handleSignupButtonClick = () => {
    setIsSignupModalOpen(true);
  };


  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/");
  }
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/AdminProfile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link onClick={handleLogout} to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );

return (
  <nav className="my-navbar" style={{ position: "fixed" }}>
    <div className="my-navbar-center">
      <div className="my-navbar-header">
        <h3
          className="my-navbar-logo"
          style={{ display: "block", fontFamily: "cursive" }}
        >
          make
          <span
            style={{
              background: "#fe5c24",
              color: "#ffff",
              borderRadius: "4px",
            }}
          >
            <i>your</i>
          </span>
          trip<span style={{ color: "#2493e0" }}>.</span>
        </h3>
        <button
          type="button"
          className="my-navbar-toggle"
          id="my-navbar-toggle"
          onClick={handleNavClick}
        >
          <FaBars />
        </button>
      </div>
      <ul
        className={`my-navbar-list ${showList ? "show-list" : ""}`}
        id="my-navbar-list"
        style={{ marginBottom: "0rem" }}
      >
        <li>
          <Link to="/AdminProfile"
            style={{ textDecoration: "none" }}
           
            className="my-navbar-links scroll-link"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link to="/ApproveAgents" className="my-navbar-links scroll-link">
            Agents
          </Link>
        </li>
        <li>
          <Link to="/TravellerDetails" className="my-navbar-links scroll-link">
            Travellers
          </Link>
        </li>
        <li>
          <Link to="/AdminGallery" className="my-navbar-links scroll-link">
          Upload
          </Link>
        </li>
        <li>
          <Link to="/AdminUploadedImages" className="my-navbar-links scroll-link">
            Gallery
          </Link>
        </li>
        <div class="my-navbar-social-icons" style={{ marginLeft: isLoggedIn ? "10rem" : "10rem" }}>
          <span>
            {isLoggedIn ? (
              <div
                className="my-profile-dropdown"
                style={{ display: "flex",justifyContent:"center",alignItems:"center" }}
              >
                {/* Customize your profile dropdown content here
              <a href="/profile">Profile</a>
              <a href="/logout">Logout</a> */}
                {/* <Dropdown
                  menu={{
                    items
                  }}
                >
                  <span style={{textAlign:"left"}} onClick={(e) => e.preventDefault()}>
                    <Space  style={{marginLeft:"8rem",textAlign:"left"}}>
                      Hi , User
                      <DownOutlined />
                    </Space>
                  </span>
                </Dropdown> */}
            <div className="my-profile-dropdown">
              <Dropdown overlay={menu}>
                <span style={{ cursor: "pointer" }}>
                  <Space>
                    Hi, Admin <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </div>
              </div>
            ) : (
              // <div>
                <a
                  href="#"
                  class="my-navbar-links-icon"
                  style={{ marginRight: "1rem" }}
                  onClick={handleLoginButtonClick}
                >
                  LogIn
               {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />} 


                </a>
              // {/* </div> */}
            )}
          </span>
          <span>
            {!isLoggedIn && (
              // <div>
                <a
                  href="#"
                  class="my-navbar-links-icon "
                  onClick={handleSignupButtonClick}
                >
                  SignUp
                  {isSignupModalOpen && (
              <SignupModal onClose={() =>setIsSignupModalOpen(false)} />
            )}
                </a>
              // {/* </div> */}
            )}
          </span>
        </div>
      </ul>
    </div>
  </nav>
);
}

export default AdminNavbar;
