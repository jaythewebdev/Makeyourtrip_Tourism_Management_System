import "./AgentDestinatio.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useState } from "react";
import AgentNavbar from "../Navbar/AgentNavbar";


function AgentDestination() {
  const [activeTab, setActiveTab] = useState("destination");

  //   For Destination Table
  const [destination, setDestination] = useState({
    destinationCityName: "",
    country: ""
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  var AddDestination = () => {
    fetch("http://localhost:5246/api/Destinations", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
      body: JSON.stringify({ ...destination }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        toast.success("Destination Added Successful");
      })
      .catch((err) => {
        toast.error("Invalid Data Try Again");
        console.log(err.error);
      });
  };
  //   For Exclusion Table

  const [exclusion, setExclusion] = useState({
    exclusionDescription: ""
  });

  var AddExclusion = () => {
    fetch("http://localhost:5246/api/Exclusions", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
      body: JSON.stringify({ ...exclusion }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        toast.success("Exclusion Added Successful");
      })
      .catch((err) => {
        toast.error("Invalid Data Try Again");
        console.log(err.error);
      });
  };

  //   For Inclusion Table

  const [inclusion, setInclusion] = useState({
    inclusionDescriptionn: ""
  });

  var AddInclusion = () => {
    fetch("http://localhost:5246/api/Inclusions", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
      body: JSON.stringify({ ...inclusion }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        toast.success("Inclusion Added Successful");
      })
      .catch((err) => {
        toast.error("Invalid Data Try Again");
        console.log(err.error);
      });
  };
  

  return (
    <div>
      {/*  */}
      <div>
        <AgentNavbar/>
      </div>
      <div class="container py-5" style={{marginTop:"7rem"}}>
        {/* <!-- For demo purpose --> */}
        <h3 style={{textAlign:"center"}}>Add Custom Fields</h3>

        {/* <!-- End --> */}

        <div class="row">
          <div class="col-lg-7 mx-auto">
            <div class="bg-white rounded-lg shadow-sm p-5">
              {/* <!-- Credit card form tabs --> */}
              <ul
                role="tablist"
                className="nav bg-light nav-pills rounded-pill nav-fill mb-3"
              >
                <li className="nav-item">
                  <a
                    href="#nav-tab-card"
                    className={`nav-link rounded-pill ${
                      activeTab === "destination" ? "my-active" : ""
                    }`}
                    onClick={() => handleTabClick("destination")}
                  >
                    Destination
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#nav-tab-paypal"
                    className={`nav-link rounded-pill ${
                      activeTab === "exclusion" ? "my-active" : ""
                    }`}
                    onClick={() => handleTabClick("exclusion")}
                  >
                    Exclusion
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#nav-tab-bank"
                    className={`nav-link rounded-pill ${
                      activeTab === "inclusion" ? "my-active" : ""
                    }`}
                    onClick={() => handleTabClick("inclusion")}
                  >
                    <i className="fa fa-university"></i>
                    Inclusion
                  </a>
                </li>
              </ul>
              
              {/* <!-- End --> */}

              {/* <!-- Destination --> */}
              <div class="tab-content">
                {/* <!-- credit card info--> */}
                <div
                  id="nav-tab-card"
                  className={`tab-pane fade ${
                    activeTab === "destination" ? "show active" : ""
                  }`}
                >
                  <div role="form" className="d-flex flex-column">
                    <div className="form-group" style={{marginTop:"1rem"}}>
                      <label htmlFor="username" style={{color:"black"}}>Destination City</label>
                      <input
                        type="description"
                        name="username"
                        placeholder="Name"
                        required
                        className="form-control"
                        onChange={(event) => {
                          setDestination({
                            ...destination,
                            destinationCityName: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardNumber" style={{color:"black"}}>Country</label>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-control"
                          required
                          onChange={(event) => {
                            setDestination({
                              ...destination,
                              country: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={AddDestination}
                      type="button"
                      style={{backgroundColor:"#fe5c24",color:"white"}}
                      className="subscribe btn btn-primary btn-block rounded-pill align-items-center shadow-sm my-5"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                {/* <!-- End --> */}

                {/* <!-- Exclusion info --> */}
                <div
                  id="nav-tab-paypal"
                  className={`tab-pane fade ${
                    activeTab === "exclusion" ? "show active" : ""
                  }`}
                >

                  <form role="form" className="d-flex flex-column">
                    <div className="form-group" style={{marginTop:"1rem"}}>
                      <label htmlFor="username" style={{color:"black"}}>Exclusion Description</label>
                      <br />
                      <textarea
                        type="description"
                        name="text"
                        placeholder="Details"
                        required
                        className="form-control"
                        style={{ marginTop: "10px" }}
                        onChange={(event) => {
                          setExclusion({
                            ...exclusion,
                            exclusionDescription: event.target.value,
                          });
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={AddExclusion}
                      style={{backgroundColor:"#fe5c24",color:"white"}}
                      className="subscribe btn  btn-block rounded-pill align-items-center shadow-sm my-5"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {/* <!-- End --> */}

                {/* <!-- Inclusion --> */}
                <div
                  id="nav-tab-paypal"
                  className={`tab-pane fade ${
                    activeTab === "inclusion" ? "show active" : ""
                  }`}
                >
                  <form role="form" className="d-flex flex-column">
                    <div className="form-group" style={{marginTop:"1rem"}}>
                      <label htmlFor="username" style={{color:"black"}}>Inclusion Description</label>
                      <br />
                      <textarea
                        type="description"
                        name="text"
                        placeholder="Details"
                        required
                        className="form-control"
                        style={{ marginTop: "10px" }}
                        onChange={(event) => {
                          setInclusion({
                            ...inclusion,
                            inclusionDescription: event.target.value,
                          });
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={AddInclusion}
                      style={{backgroundColor:"#fe5c24",color:"white"}}
                      className="subscribe btn btn-primary btn-block rounded-pill align-items-center shadow-sm my-5"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {/* <!-- End --> */}
              </div>
              {/* <!-- End --> */}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
export default AgentDestination;