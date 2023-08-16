import React from "react";
import "./ProfilePage.css"; // Import your CSS file
import Navbar from "../../Navbar/Navbar";
import profileimage from "../ProfileImage/profile-img.jpg"
import BookingTable from "../Tables/BookingTable";
import { useState,useEffect } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import AgentNavbar from "../../Navbar/AgentNavbar";

const AdminProfilePage = () => {
    const [profile, setProfile] = useState();

    // const userEmail= localStorage.getItem("emailId");
    const emailId="jai123@gmail.com";
    
    
    var GetProfile = () => {
        fetch(`http://localhost:5279/api/Admin/Admin_Profile?key=${encodeURIComponent(emailId)}`, {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then(async (data) => {
          var myData = await data.json();
          console.log(myData);
          setProfile(myData);
        });
      };
      useEffect(() => {
        GetProfile();
      }, [emailId]);
 



  return (
    <div>
      <AdminNavbar/>
      <div className="container" style={{ marginTop: "7rem" }}>
      <div className="row no-gutters">
        <div className="col-md-12 col-lg-12">
          {profile && (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                <h3 className="display-5">{profile.name}</h3>
              </div>
              <div className=" p-3 bg-black text-white">
                <h6 style={{ paddingLeft: "2.1rem" }}>
                  {profile.emailId} | {profile.phoneNumber}
                </h6>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {profile &&(
        <button className="my-btn" style={{ width: "100%" }}>
          Welcome {profile.name}
        </button>
        )}
      </div>
      <div className="booking-table">
      </div>
    </div>
  </div>
);
};

export default AdminProfilePage;
