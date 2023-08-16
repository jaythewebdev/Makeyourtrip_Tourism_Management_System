import { toast } from "react-toastify";
import "../Login/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSlideChange = () => {
    setIsLogin(!isLogin);
  };

  const handleRegistration = () => {
    if (isLogin) {
      userRegister(); // Call user registration function for travelers
    } else {
      AgentRegister(); // Call agent registration function for agents
    }
  };

  const navigate=useNavigate();

  var [agent, setAgent] = useState({
    user: {},
    agencyName: "",
    contactPersonName: "",
    phoneNumber: "",
    emailId: "",
    street: "",
    city: "",
    state: "",
    country: "",
    status: "",
    passwordClear: "",
  });
  var AgentRegister = () => {
    fetch("http://localhost:5279/api/TravelAgent/agent_Registration", {
      //Localhost :Your ID
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...agent }),
    })
      .then(async (data) => {
        // if(agent.agencyName==null){
        //   toast.error("Agency name is mandatory")
        //   return;
        // }
        // if(agent.contactPersonName==null){
        //   toast.error("Contact person name is mandatory")
        //   return;

        // }
        // if(agent.phoneNumber==null){
        //   toast.error("Phone number is mandatory")
        //   return;

        // }
        // if(agent.emailId==null){
        //   toast.error("emailId is mandatory")
        //   return;

        // }
        // if(agent.street==null){
        //   toast.error("Street is mandatory")
        //   return;

        // }
        // if(agent.city==null){
        //   toast.error("City  is mandatory")
        //   return;

        // }
        // if(agent.country==null){
        //   toast.error("Country  is mandatory")
        //   return;

        // }
        // if(agent.passwordClear==null){
        //   toast.error("Password  is mandatory")
        //   return;

        // }
        var myData = await data.json();
        console.log(myData);
        if(myData.status==="UnApproved"){
          toast.success("Agent Registered Successfullly try logging in");
          navigate("/");
        }
        else{
          toast.success("Agent Registered Successful");
          localStorage.setItem("userId", myData.id); // Modify the property name here
          localStorage.setItem("role", myData.role);
          localStorage.setItem("token", myData.token);
          localStorage.setItem("emailId", myData.emailId);
          localStorage.setItem("status", myData.status);
          navigate("/AgentProfile");
        }
      })
      .catch((err) => {
        toast.error("Check Credentials");
        console.log(err.error);
      });
  };
  var [traveller, settraveller] = useState({
    user: {},
    name: "",
    phoneNumber: "",
    emailId: "",
    passwordClear: "",
  });

  var userRegister = () => {
    fetch("http://localhost:5279/api/Traveller/Traveller_Registration", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...traveller }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        toast.success("Traveller Registered Successful");
        localStorage.setItem("userId", myData.id); // Modify the property name here
        localStorage.setItem("role", myData.role);
        localStorage.setItem("token", myData.token);
        localStorage.setItem("emailId", myData.emailId);
        localStorage.setItem("status", myData.status);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Invalid Credentials Try Again");
        console.log(err.error);
      });
  };

  

  return (
    <div className="login-wrapper">
      {/* <div> */}
      <div className="login-title-text">
        <div
          className={`login-title ${
            isLogin ? "login-form-title" : "signup-form-title"
          }`}
        >
          {isLogin ? "Register" : "Register"}
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-slide-controls">
          <input
            type="radio"
            name="login-slide"
            id="login"
            checked={isLogin}
            onChange={handleSlideChange}
          />
          <input
            type="radio"
            name="login-slide"
            id="signup"
            checked={!isLogin}
            onChange={handleSlideChange}
          />
          <label
            htmlFor="login"
            className={`login-slide ${isLogin ? "login" : "signup"}`}
          >
            Traveller
          </label>
          <label
            htmlFor="signup"
            className={`login-slide ${isLogin ? "signup" : "login"}`}
          >
            Agent
          </label>
          <div
            className={`login-slider-tab ${isLogin ? "login" : "signup"}`}
          ></div>
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
            {!isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="Agency Name"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      agencyName: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="Contact Person Name"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      contactPersonName: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="tel"
                  placeholder="PhoneNumber"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      phoneNumber: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      emailId: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="Street"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      street: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="City"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      city: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="State"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      state: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="Country"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      country: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isLogin && (
              <div className="login-field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(event) => {
                    setAgent({
                      ...agent,
                      passwordClear: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {isLogin && (
              <div className="login-field">
                <input
                  type="text"
                  placeholder="User Name"
                  required
                  onChange={(event) => {
                    settraveller({
                      ...traveller,
                      name: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {isLogin && (
              <div className="login-field">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  onChange={(event) => {
                    settraveller({
                      ...traveller,
                      phoneNumber: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {isLogin && (
              <div className="login-field">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(event) => {
                    settraveller({
                      ...traveller,
                      emailId: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            {isLogin && (
              <div className="login-field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(event) => {
                    settraveller({
                      ...traveller,
                      passwordClear: event.target.value,
                    });
                  }}
                />
              </div>
            )}
            <div className="login-field my-login-btn">
              <div className="login-btn-layer"></div>
              <input
                type="submit"
                onClick={handleRegistration}
                value={isLogin ? "Signup" : "Signup"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Signup;
