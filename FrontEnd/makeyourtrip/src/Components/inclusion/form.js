import "./TourDetailsForm.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useState } from "react";
function TourDetailsForm() {
  const [activeTab, setActiveTab] = useState("destination");

  //   For Destination Table
  const [destination, setDestination] = useState({
    destinationId: 0,
    destinationName: "",
    country: "",
    city: "",
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  var AddDestination = () => {
    fetch("http://localhost:5063/api/Destinations", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
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
    exclusionDescriptionn: "",
  });

  var AddExclusion = () => {
    fetch("http://localhost:5063/api/Exclusions", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
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
    inclusionDescriptionn: "",
  });

  var AddInclusion = () => {
    fetch("http://localhost:5063/api/Inclusions", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
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
      help
      {/*  */}
      <div class="container py-5">
        {/* <!-- For demo purpose --> */}

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
                      activeTab === "destination" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("destination")}
                  >
                    <i className="fa fa-credit-card"></i>
                    Destination
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#nav-tab-paypal"
                    className={`nav-link rounded-pill ${
                      activeTab === "exclusion" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("exclusion")}
                  >
                    <i className="fa fa-paypal"></i>
                    Exclusion
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#nav-tab-bank"
                    className={`nav-link rounded-pill ${
                      activeTab === "inclusion" ? "active" : ""
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
                  <p class="alert alert-warning">
                    Enter The Details Carefully &nbsp;
                    <span style={{ fontSize: "10px" }}>
                      once entered cant be changed
                    </span>
                  </p>
                  <div role="form" className="d-flex flex-column">
                    <div className="form-group">
                      <label htmlFor="username">Destination Name</label>
                      <input
                        type="description"
                        name="username"
                        placeholder="Name"
                        required
                        className="form-control"
                        onChange={(event) => {
                          setDestination({
                            ...destination,
                            destinationName: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Country</label>
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
                    <div className="form-group">
                      <label htmlFor="cardNumber">City</label>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-control"
                          required
                          onChange={(event) => {
                            setDestination({
                              ...destination,
                              city: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={AddDestination}
                      type="button"
                      className="subscribe btn btn-primary btn-block rounded-pill align-items-center shadow-sm my-5"
                    >
                      Next
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
                  <p class="alert alert-warning">
                    Enter The Details Carefully &nbsp;
                    <span style={{ fontSize: "10px" }}>
                      once entered cant be changed
                    </span>
                  </p>
                  <form role="form" className="d-flex flex-column">
                    <div className="form-group">
                      <label htmlFor="username">Description</label>
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
                            exclusionDescriptionn: event.target.value,
                          });
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={AddExclusion}
                      className="subscribe btn btn-primary btn-block rounded-pill align-items-center shadow-sm my-5"
                    >
                      Next
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
                  <p class="alert alert-warning">
                    Enter The Details Carefully &nbsp;
                    <span style={{ fontSize: "10px" }}>
                      once entered cant be changed
                    </span>
                  </p>
                  <form role="form" className="d-flex flex-column">
                    <div className="form-group">
                      <label htmlFor="username">Description</label>
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
                            inclusionDescriptionn: event.target.value,
                          });
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={AddInclusion}
                      className="subscribe btn btn-primary btn-block rounded-pill align-items-center shadow-sm my-5"
                    >
                      Next
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
export default TourDetailsForm;