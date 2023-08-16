// npm install react-star-ratings
// change models

import "./Feedback.css";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
function FeedBackForm() {
  var [feedback, setFeedBack] = useState({
    travellerName:"",
    touristSpotName: "",
    email: localStorage.getItem("emailId"),
    feedbackText: "",
    rating: 0,
    dateSubmitted: new Date().toISOString().slice(0, 10),
  });

  const navigate=useNavigate();

  var Feedback = () => {
    fetch("http://localhost:5165/api/Feedback"    , {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
      body: JSON.stringify({ ...feedback }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        toast.success("Feedback Sent");
        navigate(-1);
      })
      .catch((err) => {
        toast.error("Invalid Feedback Try Again");
        console.log(err.error);
      });
  };
  return (
    <div>
        <div>
            <Navbar/>
        </div>

      {/*  */}
      <div class="container-fluid px-1 py-5 mx-auto" style={{marginTop:"4rem"}}>
        <div class="row d-flex justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>Your Feedback Help us To Improve</h3>
            <div class="cardfeedback">
              <h5 class="text-center mb-4">Powering world-class Tours</h5>
              <div class="form-card">
                <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Name
                    </label>{" "}
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      onChange={(event) => {
                        setFeedBack({
                          ...feedback,
                          travellerName: event.target.value,
                        });
                      }}
                      placeholder="Enter your first name"
                    />{" "}
                  </div>
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Tour Name
                    </label>{" "}
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      onChange={(event) => {
                        setFeedBack({
                          ...feedback,
                          touristSpotName: event.target.value,
                        });
                      }}
                      placeholder="Tour Name"
                    />{" "}
                  </div>
                </div>

                {/* <div class="row justify-content-between text-left">
                  <div class="form-group col-sm-6 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Email
                    </label>{" "}
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={(event) => {
                        setFeedBack({
                          ...feedback,
                          email: event.target.value,
                        });
                      }}
                      placeholder="Email"
                    />{" "}
                  </div>
                </div> */}

                <div class="row justify-content-between text-left">
                  <div class="form-group col-12 flex-column d-flex">
                    {" "}
                    <label class="form-control-label px-3">
                      Description
                    </label>{" "}
                    <textarea
                      type="text"
                      id="mob"
                      name="mob"
                      placeholder="Describe"
                      onChange={(event) => {
                        setFeedBack({
                          ...feedback,
                          feedbackText: event.target.value,
                        });
                      }}
                    />{" "}
                  </div>
                </div>
                <div class="row justify-content-between text-left">
                  <div class="form-group col-12 flex-column d-flex">
                    {" "}
                    <label className="form-control-label px-3">
                      Rating
                    </label>
                    <StarRatings
                      rating={feedback.rating}
                      starRatedColor="gold" // You can customize the color
                      changeRating={(newRating) => {
                        setFeedBack({
                          ...feedback,
                          rating: newRating,
                        });
                      }}
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="form-group col-sm-6">
                    {" "}
                    {/* <Link to="/userdashboard"> */}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={Feedback}
                        style={{marginTop:"1rem"}}
                      >
                        Submit Feedback
                      </button>{" "}
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
export default FeedBackForm;