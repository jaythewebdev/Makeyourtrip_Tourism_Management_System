import { useEffect,useState } from "react";
import AgentNavbar from "../Navbar/AgentNavbar";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import './TourPackage.css'
import { useNavigate } from "react-router-dom";



function TripPackage() {
    const [activeTab, setActiveTab] = useState("general");
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    // Your existing state and functions
  
    const[destinations,setdestinations]=useState([]);
      const[Inclusion,setInclusion]=useState([]);
      const[Exclusion,setExclusion]=useState([]);
  
    const [tourPackage, setTourPackage] = useState({
      tourId: 0,
      travelAgentId: localStorage.getItem("userId"),
      tourName: "",
      tourDescription: "",
      tourType: "",
      departureDate: "",
      returnDate: "",
      tourPrice: 0,
      maxCapacity: 0,
      bookedCapacity: 0,
      availability: "",
      imageUrl: "",
      accomodationStatus: "",
      cancellationPolicy: "",
      bookingRestriction: 0,
      healthAndSafety: "",
      pickupPoints: [
        {
          pickupPointId: 0,
          tourId: 0,
          location: "",
          pickupTime: "",
        },
      ],
      itineraries: [
        {
          itineraryId: 0,
          tourId: 0,
          dayNumber: 0,
          date: "",
          destinationId: 0,
          dailySchedules: [
            {
              scheduleId: 0,
              itineraryId: 0,
              timing: "",
              activity: "",
              place: "",
            },
          ],
        },
      ],
      tourDestination: [
        {
          id: 0,
          tourId: 0,
          destinationId: 0,
          destinationimage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
          destinationActivity: "",
        },
      ],
      tourInclusion: [
        {
          id: 0,
          tourId: 0,
          inclusionId: 1,
        },
      ],
      tourExclusion: [
        {
          id: 0,
          tourId: 0,
          exclusionId: 1,
        },
      ],
    });

    // Image upload

    // useEffect(() => {
    //     // This will be called whenever imageData changes
    //     if (tourPackage.imageUrl !== "") {
    //       ();
    //     }
    //   }, [imageData]);

    const customRequest = ({ file, onSuccess }) => {
        // Simulate uploading the file and generating a preview
        const reader = new FileReader();
        reader.onload = (e) => {
          file.thumbUrl = e.target?.result;
          onSuccess();
        };
        reader.readAsDataURL(file);
    
        // Perform Google Drive upload and get file ID
        uploadToGoogleDrive(file);
      };
    
      const uploadToGoogleDrive = (file) => {
        const metadata = {
          name: file.name,
          mimeType: file.type,
          parents: ["1e9ef7-WXM3_eUWurEO316ZNZUs6WszzW"],
        };
    
        const accessToken = "ya29.a0AfB_byCS3FYL_CEHN1De2ZfnqDGaBzIrilW3yxX-nBoOKql1EppeAn-tQxZ5EytCzzpGCV0GWJdwxFT61YNSCyer8bqFoJexMq35JwbIFf6BeWzu27Dw95oxjVqQOoj7R6ZdNDkgSUJSpBAD-5vq2VFBG6zpJ7caCgYKAb8SARASFQHsvYlseJnxJ9gfNjr6SaF5UjK3AA0166"
                    
              const form = new FormData();
              form.append(
                "metadata",
                new Blob([JSON.stringify(metadata)], { type: "application/json" })
              );
              form.append("file", file);
          
              fetch(
                "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: form,
                }
              )
                .then(async (response) => {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  var myData = await response.json();
                  console.log(myData);
                  setTourPackage({
                    ...tourPackage,
                    imageUrl: "https://drive.google.com/uc?export=view&id=" + myData.id,
                  });
                  toast.success("Image Uploaded Successfully");
                })
                .catch((error) => {
                  console.error("Error uploading file:", error);
                });
            };
          
          
    
  
    const handleInputChange = (itineraryIndex, field, value) => {
      const updatedTourItinerary = [...tourPackage.itineraries];
      updatedTourItinerary[itineraryIndex] = {
        ...updatedTourItinerary[itineraryIndex],
        [field]: value,
      };
      setTourPackage({ ...tourPackage, itineraries: updatedTourItinerary });
    };
  
    const handleCountChange = (e) => {
      const newCount = parseInt(e.target.value, 10);
      const newTourItinerary = Array.from({ length: newCount }, () => ({
        dayNumber: 0,
        date: "",
        destinationId: 0,
        dailySchedules: [
          {
            scheduleId: 0,
            timing: "",
            activity: "",
            place: "",
          },
        ],
      }));
      setTourPackage({
        ...tourPackage,
        itineraries: newTourItinerary,
      });
    };
  
    const handleAddPickupPoint = () => {
      const newPickupPoints = [...tourPackage.pickupPoints];
      newPickupPoints.push({
        pickupPointId: 0,
        tourId: 0,
        location: "",
        pickupTime: "",
      });
      setTourPackage({ ...tourPackage, pickupPoints: newPickupPoints });
    };
  
    const handleDeletePickupPoint = (index) => {
      const updatedPickupPoints = tourPackage.pickupPoints.filter(
        (_, i) => i !== index
      );
      setTourPackage({ ...tourPackage, pickupPoints: updatedPickupPoints });
    };
  
    const handlePickupPointChange = (index, field, value) => {
      const updatedPickupPoints = [...tourPackage.pickupPoints];
      updatedPickupPoints[index][field] = value;
      setTourPackage({ ...tourPackage, pickupPoints: updatedPickupPoints });
    };
  
    const renderPickupPoints = () => {
      return tourPackage.pickupPoints.map((pickupPoint, index) => (
        <div key={index} className="tourPickupPoint">
          <div>
            <h3>Pickup Point {index + 1}</h3>
          </div>
          <div className="tourPickupPointDetails">
            <div>
              <label className="addTourInputLabel">Location:</label>
              <input
                type="text"
                className="addTourInputField"
                value={pickupPoint.location}
                onChange={(e) =>
                  handlePickupPointChange(index, "location", e.target.value)
                }
              />
            </div>
            <div>
              <label className="addTourInputLabel">Pickup Time:</label>
              <input
                type="date"
                className="addTourInputField"
                value={pickupPoint.pickupTime}
                onChange={(e) =>
                  handlePickupPointChange(index, "pickupTime", e.target.value)
                }
              />
            </div>
            {tourPackage.pickupPoints.length > 1 && (
              <button
                onClick={() => handleDeletePickupPoint(index)}
                className="tourDataDeleteButton"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ));
    };
  
    //   Itineraries
  
    const handleAddDailySchedule = (itineraryIndex) => {
      const newDailySchedules = [
        ...tourPackage.itineraries[itineraryIndex].dailySchedules,
      ];
      newDailySchedules.push({
        scheduleId: 0,
        itineraryId: 0,
        timing: "",
        activity: "",
        place: "",
      });
  
      const updatedItineraries = [...tourPackage.itineraries];
      updatedItineraries[itineraryIndex].dailySchedules = newDailySchedules;
  
      setTourPackage({ ...tourPackage, itineraries: updatedItineraries });
    };
  
    const handleDeleteDailySchedule = (itineraryIndex, scheduleIndex) => {
      const updatedDailySchedules = [
        ...tourPackage.itineraries[itineraryIndex].dailySchedules,
      ];
      updatedDailySchedules.splice(scheduleIndex, 1);
  
      const updatedItineraries = [...tourPackage.itineraries];
      updatedItineraries[itineraryIndex].dailySchedules = updatedDailySchedules;
  
      setTourPackage({ ...tourPackage, itineraries: updatedItineraries });
    };
  
    const handleDailyScheduleChange = (
      itineraryIndex,
      scheduleIndex,
      field,
      value
    ) => {
      const updatedDailySchedules = [
        ...tourPackage.itineraries[itineraryIndex].dailySchedules,
      ];
      updatedDailySchedules[scheduleIndex][field] = value;
  
      const updatedItineraries = [...tourPackage.itineraries];
      updatedItineraries[itineraryIndex].dailySchedules = updatedDailySchedules;
  
      setTourPackage({ ...tourPackage, itineraries: updatedItineraries });
    };
  
    const renderDailySchedules = (itineraryIndex) => {
      const dailySchedules =
        tourPackage.itineraries[itineraryIndex].dailySchedules;
      return dailySchedules.map((schedule, scheduleIndex) => (
        <div key={scheduleIndex} className="tourDailySchedule">
          <div>
            <h4>Daily Schedule {scheduleIndex + 1}</h4>
          </div>
          <div className="tourDailyScheduleDetails">
            <div>
              <label className="addTourInputLabel">Timing:</label>
              <input
                type="text"
                className="addTourInputField"
                value={schedule.timing}
                onChange={(e) =>
                  handleDailyScheduleChange(
                    itineraryIndex,
                    scheduleIndex,
                    "timing",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="addTourInputLabel">Activity:</label>
              <input
                type="text"
                className="addTourInputField"
                value={schedule.activity}
                onChange={(e) =>
                  handleDailyScheduleChange(
                    itineraryIndex,
                    scheduleIndex,
                    "activity",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="addTourInputLabel">Place:</label>
              <input
                type="text"
                className="addTourInputField"
                value={schedule.place}
                onChange={(e) =>
                  handleDailyScheduleChange(
                    itineraryIndex,
                    scheduleIndex,
                    "place",
                    e.target.value
                  )
                }
              />
            </div>
            {dailySchedules.length > 1 && (
              <button
                onClick={() =>
                  handleDeleteDailySchedule(itineraryIndex, scheduleIndex)
                }
                className="tourDataDeleteButton"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ));
    };
  
    const renderItineraries = () => {
      return tourPackage.itineraries.map((itinerary, itineraryIndex) => (
        <div key={itineraryIndex} className="tourItinerary">
          <h3 className="dayNumber">Day {itineraryIndex + 1}</h3>
          <div>
            <label className="addTourInputLable">Day Number</label>
            <input
              type="number"
              className="addTourInputField"
              value={itinerary.dayNumber}
              onChange={(e) =>
                handleInputChange(itineraryIndex, "dayNumber", e.target.value)
              }
            />
          </div>
          <div>
            <label className="addTourInputLable">Date</label>
            <input
              type="date"
              className="addTourInputField"
              value={itinerary.date}
              onChange={(e) =>
                handleInputChange(itineraryIndex, "date", e.target.value)
              }
            />
          </div>
          <div>
            <label className="addTourInputLable">Destination </label>
            <select
              className="addTourInputField"
              value={destinations.destinationId}
              onChange={(e) =>
                handleInputChange(itineraryIndex, "destinationId", e.target.value)
              }
            >
              <option value="">Select Destination</option>
              {destinations.map((dest) => (
                <option key={dest.destinationId} value={dest.destinationId}>
                  {dest.destinationCityName}
                </option>
              ))}
            </select>
  
          </div>
          <div className="tourDailySchedules">
            <h3 style={{marginTop:"2rem",marginBottom:"1rem"}}>Daily Schedules</h3>
            {renderDailySchedules(itineraryIndex)}
            <button
              onClick={() => handleAddDailySchedule(itineraryIndex)}
              className="tourDataAddButton"
              style={{backgroundColor:"#fe5c24",color:"white"}}

            >
              Add Daily Schedule
            </button>
          </div>
        </div>
      ));
    };
  
    //   tourDestinations
  
    const handleAddTourDestination = () => {
      const newTourDestinations = [...tourPackage.tourDestination];
      newTourDestinations.push({
        id: 0,
        tourId: 0,
        destinationId: 0,
        // destinationimage: "",
        destinationActivity: "",
      });
  
      setTourPackage({ ...tourPackage, tourDestination: newTourDestinations });
    };
  
    const handleDeleteTourDestination = (destinationIndex) => {
      const updatedTourDestinations = [...tourPackage.tourDestination];
      updatedTourDestinations.splice(destinationIndex, 1);
  
      setTourPackage({
        ...tourPackage,
        tourDestination: updatedTourDestinations,
      });
    };
  
    const handleTourDestinationChange = (destinationIndex, field, value) => {
      const updatedTourDestinations = [...tourPackage.tourDestination];
      updatedTourDestinations[destinationIndex][field] = value;
  
      setTourPackage({
        ...tourPackage,
        tourDestination: updatedTourDestinations,
      });
    };
  
    const renderTourDestinations = () => {
      return tourPackage.tourDestination.map((destination, destinationIndex) => (
        <div key={destinationIndex} className="tourDestination">
          <h3>Destination {destinationIndex + 1}</h3>
          <div className="tourDestinationDetails">
            <div>
              <label className="addTourInputLabel">Destination Id:</label>
  
            <select
              className="addTourInputField"
              value={destinations.destinationId}
              onChange={(e) =>
                handleTourDestinationChange(
                  destinationIndex,
                  "destinationId",
                  e.target.value
                )
              }
            >
              <option value="">Select Destination</option>
              {destinations.map((dest) => (
                <option key={dest.destinationId} value={dest.destinationId}>
                  {dest.destinationCityName}
                </option>
              ))}
            </select>
            </div>
            {/* <div>
              <label className="addTourInputLabel">Destination Image:</label>
              <input
                type="text"
                className="addTourInputField"
                value={destination.destinationimage}
                onChange={(e) =>
                  handleTourDestinationChange(
                    destinationIndex,
                    "destinationimage",
                    e.target.value
                  )
                }
              />
            </div> */}
            <div>
              <label className="addTourInputLabel">Destination Activity:</label>
              <input
                type="text"
                className="addTourInputField"
                value={destination.destinationActivity}
                onChange={(e) =>
                  handleTourDestinationChange(
                    destinationIndex,
                    "destinationActivity",
                    e.target.value
                  )
                }
              />
            </div>
            {tourPackage.tourDestination.length > 1 && (
              <button
                onClick={() => handleDeleteTourDestination(destinationIndex)}
                className="tourDataDeleteButton"

              >
                Delete
              </button>
            )}
          </div>
        </div>
      ));
    };
  
    const handleAddInclusion = () => {
      const newInclusions = [...tourPackage.tourInclusion];
      newInclusions.push({ inclusionId: 0 });
      setTourPackage({ ...tourPackage, tourInclusion: newInclusions });
    };
  
    const handleDeleteInclusion = (index) => {
      const updatedInclusions = tourPackage.tourInclusion.filter(
        (_, i) => i !== index
      );
      setTourPackage({ ...tourPackage, tourInclusion: updatedInclusions });
    };
  
    const handleInclusionChange = (index, value) => {
      const updatedInclusions = [...tourPackage.tourInclusion];
      updatedInclusions[index].inclusionId = value;
      setTourPackage({ ...tourPackage, tourInclusion: updatedInclusions });
    };
  
    const renderInclusions = () => {
      return tourPackage.tourInclusion.map((inclusion, index) => (
        <div key={index} className="tourInclusions">
          <div>
            <label className="addTourInputLable">inclusion {index + 1}</label>
            {/* <input
              type="number"
              className="addTourInputField"
              value={inclusion.inclusionId}
              onChange={(e) => handleInclusionChange(index, e.target.value)}
            /> */}
            <select
              className="addTourInputField"
              value={Inclusion.inclusionId}
              onChange={(e) => handleInclusionChange(index, e.target.value)}
            >
              <option value="">Select Inclusions</option>
              {Inclusion.map((dest) => (
                <option key={dest.inclusionId} value={dest.inclusionId}>
                  {dest.inclusionDescription}
                </option>
              ))}
            </select>
            
          </div>
          <div>
            {tourPackage.tourInclusion.length > 1 && (
              <button
                onClick={() => handleDeleteInclusion(index)}
                className="tourDataDeleteButton"

              >
                Delete
              </button>
            )}
          </div>
        </div>
      ));
    };
  
    const handleAddExclusion = () => {
      const newExclusions = [...tourPackage.tourExclusion];
      newExclusions.push({ exclusionId: "" });
      setTourPackage({ ...tourPackage, tourExclusion: newExclusions });
    };
  
    const handleDeleteExclusion = (index) => {
      const updatedExclusions = tourPackage.tourExclusion.filter(
        (_, i) => i !== index
      );
      setTourPackage({ ...tourPackage, tourExclusion: updatedExclusions });
    };
  
    const handleExclusionChange = (index, value) => {
      const updatedExclusions = [...tourPackage.tourExclusion];
      updatedExclusions[index].exclusionId = value;
      setTourPackage({ ...tourPackage, tourExclusion: updatedExclusions });
    };
  
    const renderExclusions = () => {
      return tourPackage.tourExclusion.map((exclusion, index) => (
        <div key={index} className="tourExclusions">
          <div>
            <label className="addTourInputLable">exclusion {index + 1}</label>
            {/* <input
              className="addTourInputField"
              value={exclusion.exclusionId}
              onChange={(e) => handleExclusionChange(index, e.target.value)}
            /> */}
                      <select
              className="addTourInputField"
              value={Exclusion.exclusionId}
              onChange={(e) => handleExclusionChange(index, e.target.value)}
            >
              <option value="">Select Exclusions</option>
              {Exclusion.map((dest) => (
                <option key={dest.exclusionId} value={dest.exclusionId}>
                  {dest.exclusionDescription}
                </option>
              ))}
            </select>
          </div>
          <div>
            {tourPackage.tourExclusion.length > 1 && (
              <button
                onClick={() => handleDeleteExclusion(index)}
                className="tourDataDeleteButton"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ));
    };
  
    const navigate=useNavigate();
    const handleSubmit = () => {
      console.log(tourPackage);

      // Implement your fetch logic here
      fetch("http://localhost:5246/api/TourDetails", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),

        },
        body: JSON.stringify({ ...tourPackage }),
      })
        .then(async (data) => {
          var myData = await data.json();
          console.log(myData);

          toast.success("Package added successfully");
          navigate("/AgentTours")
        })
        .catch((err) => {
          console.log(err.error);
          toast.success("Package addition unsuccessfull")

        });
    };
  
    
    var GetAllDestinations = () => {
      console.log(destinations);
      fetch("http://localhost:5246/api/Destinations", {
        method: "GET",
        headers: {
          accept: "text/plain",
          // Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      }).then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        //   const filtered = myData.filter(booking => booking.userId === userId);
        //   console.log(filtered);
        setdestinations(myData);
      });
    };
    useEffect(()=>{
      GetAllDestinations();
    },[])
  
    var GetAllInclusions = () => {
      fetch("http://localhost:5246/api/Inclusions", {
        method: "GET",
        headers: {
          accept: "text/plain",
          // Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      }).then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        //   const filtered = myData.filter(booking => booking.userId === userId);
        //   console.log(filtered);
        setInclusion(myData);
      });
    };
    useEffect(()=>{
      GetAllInclusions();
    },[])
  
    var GetAllExclusion = () => {
      fetch("http://localhost:5246/api/Exclusions", {
        method: "GET",
        headers: {
          accept: "text/plain",
          // Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      }).then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        //   const filtered = myData.filter(booking => booking.userId === userId);
        //   console.log(filtered);
        setExclusion(myData);
      });
    };
    useEffect(()=>{
      GetAllExclusion();
    },[])

    const[nameToggle,setNameToggle]=useState(false);
const nameRegex=/^[a-zA-Z0-9 ]*$/;

const[tourTypeToggle,setTourTypeToggle]=useState(false);
const tourType=/^[a-zA-Z0-9 ]*$/;

const[maxCapacityToggle,setMaxCapacityToggle]=useState(false);
const maxCapacityRegex=/^[0-9]*$/;

  
    return (
      <div className="TourPackage">
        <header>
          <AgentNavbar/>
        </header>
  
        {/* ... Existing code for the header ... */}
        <div className="CreateTourHeader" style={{marginTop:"8rem",marginBottom:"2rem"}}>
          <div>
            <h1 style={{textAlign:"center",paddingTop:"2rem"}}>Create a tour package</h1>
          </div>
        </div>
  
        <div className="tabsContainer">
          <ul className="nav nav-tabs tour-tab">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "general" ? "active" : ""}`}
                onClick={() => handleTabClick("general")}
              >
                General Details
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "pickupPoints" ? "active" : ""
                }`}
                onClick={() => handleTabClick("pickupPoints")}
              >
                Pickup Points
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "itineraries" ? "active" : ""
                }`}
                onClick={() => handleTabClick("itineraries")}
              >
                Itineraries
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "tourDestinations" ? "active" : ""
                }`}
                onClick={() => handleTabClick("tourDestinations")}
              >
                Tour Destinations
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "tourInclusions" ? "active" : ""
                }`}
                onClick={() => handleTabClick("tourInclusions")}
              >
                Tour Inclusions
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "tourExclusions" ? "active" : ""
                }`}
                onClick={() => handleTabClick("tourExclusions")}
              >
                Tour Exclusions
              </a>
            </li>
          </ul>
        </div>
  
        {/* Render the content based on the active tab */}
        {activeTab === "general" && (
          <div className="formContainer">
            {/* ... Existing general details content ... */}
  
   <div className="inputLabelFlexContainer ">
          <h3>General Details</h3>
  
            {/* <label className="addTourInputLable">Tour Name</label>
            <input
              className="addTourInputField tourTitleInputField"
              type="text"
              placeholder="Title for tour"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, tourName: e.target.value })
              }
            />
          </div> */}
          <label className="addTourInputLable">Tour Name</label>
            <input
              className="addTourInputField tourTitleInputField"
              type="text"
              placeholder="Title for tour"
              onChange={(e) =>{
                setTourPackage({ ...tourPackage, tourName: e.target.value });nameRegex.test(tourPackage.tourName)?setNameToggle(false):setNameToggle(true)}
              }
            />
            { nameToggle && <p>*No special characters are allowed</p>

            }
          </div>

          {/* <div className="inputLabelFlexContainer">
            <label className="addTourInputLable ">Tour Description</label>
            <textarea
              className="addTourInputField tourDescription"
              type="text"
              placeholder="Tour description"
              onChange={(e) =>
                setTourPackage({
                  ...tourPackage,
                  tourDescription: e.target.value,
                })
              }
            />
          </div> */}

<div className="inputLabelFlexContainer">
            <label className="addTourInputLable ">Tour Description</label>
            <textarea
              className="addTourInputField tourDescription"
              type="text"
              placeholder="Tour description"
              onChange={(e) =>
                setTourPackage({
                  ...tourPackage,
                  tourDescription: e.target.value,
                })
              }
            />
          </div>

          <div className="inputLabelFlexContainer">
            <label className="addTourInputLable">Accommodation Status</label>
            <select
              className="addTourInputField"
              onChange={(e) =>
                setTourPackage({
                  ...tourPackage,
                  accomodationStatus: e.target.value,
                })
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
   <div className="inputLabelFlexContainer">
            <label className="addTourInputLable">Tour Type</label>
            <input
              type="text"
              className="addTourInputField"
              // onChange={(e) =>
              //   setTourPackage({ ...tourPackage, tourType: e.target.value })
              // }
              
            ></input>
          </div>


          
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLable">Tour Price </label>
            <input
              className="addTourInputField"
              type="number"
              placeholder="Tour Price"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, tourPrice: e.target.value })
              }
            />
          </div>
          <div className="inputLabelFlexContainer ">
            <label className="addTourInputLable">Number of Days</label>
            <input
              className="addTourInputField"
              type="number"
              min="1"
              // value={daysCount}
              onChange={handleCountChange}
            />
          </div>
          {/* <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Departure Date:</label>
            <input
              className="addTourInputField"
              type="date"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, departureDate: e.target.value })
              }
            />
          </div> */}
                    <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Departure Date:</label>
            <input
              className="addTourInputField"
              type="date"
              placeholder="Tour Name"
              onChange={(e) =>{
                setTourPackage({ ...tourPackage, departureDate: e.target.value })}
              }
            />
            {tourPackage.departureDate.date<new Date().toISOString().slice(0, 10) && <p>*Departure date should be greater than current date</p>}
          </div>
          {/* <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Return Date:</label>
            <input
              className="addTourInputField"
              type="date"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, returnDate: e.target.value })
              }
            />
          </div> */}
                    <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Return Date:</label>
            <input
              className="addTourInputField"
              type="date"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, returnDate: e.target.value })
              }
            />{tourPackage.returnDate.date>tourPackage.returnDate.date && <p>*Return date should be greater than departure date</p>}
          </div>

          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Maximum capacity: </label>
            <input
              className="addTourInputField"
              type="number"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, maxCapacity: e.target.value })
              }
            />
          </div>
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Booked capacity: </label>
            <input
              className="addTourInputField"
              type="number"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, bookedCapacity: e.target.value })
              }
            />
          </div>
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Availability: </label>
            <input
              className="addTourInputField"
              type="text"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, availability: e.target.value })
              }
            />
          </div>
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Image url: </label>
            {/* <input
              className="addTourInputField"
              type="text"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({ ...tourPackage, imageUrl: e.target.value })
              }
            /> */}

<div className="uploadform">
      <Upload
        customRequest={customRequest}
        listType="picture"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
      <br />
      {tourPackage.imageUrl && (
        <div className="d-flex justify-content-center">
          <img
            src={tourPackage.imageUrl}
            alt={tourPackage.imageName}
            style={{ maxWidth: "100%", marginTop: "20px" }}
          />
        </div>
      )}
    </div>


          </div>
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Cancellation Policy : </label>
  
             <select
              className="addTourInputField"
              onChange={(e) =>
                  setTourPackage({
                    ...tourPackage,
                    cancellationPolicy: e.target.value,
                  })
              }
            >
              <option value="">Select</option>
              <option value="Free">Free</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Booking Restriction : </label>
            <input
              className="addTourInputField"
              type="number"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({
                  ...tourPackage,
                  bookingRestriction: e.target.value,
                })
              }
            />
          </div>
          <div className="inputLabelFlexContainer">
            <label className="addTourInputLabel">Health & Safety : </label>
            <input
              className="addTourInputField"
              type="text"
              placeholder="Tour Name"
              onChange={(e) =>
                setTourPackage({
                  ...tourPackage,
                  healthAndSafety: e.target.value,
                })
              }
            />
          </div>
  
  
          </div>
        )}
  
        {activeTab === "pickupPoints" && (
          <div className="formContainer">
            {/* ... Existing pickup points content ... */}
   <div className="inputLabelFlexContainer tourTitleDescription">
          {renderPickupPoints()}
          <button onClick={handleAddPickupPoint} className="tourDataAddButton"             style={{backgroundColor:"#fe5c24",color:"white"}}
>
            Add Pickup Point
          </button>
        </div>
          </div>
        )}
  
        {activeTab === "itineraries" && (
          <div className="formContainer">
            {/* ... Existing itineraries content ... */}
  <div className="inputLabelFlexContainer tourTitleDescription">
            <h2>Itineraries</h2>
            {renderItineraries()}
          </div>
          </div>
        )}
  
        {activeTab === "tourDestinations" && (
          <div className="formContainer">
            {/* ... Existing tour destinations content ... */}
  <div className="inputLabelFlexContainer tourTitleDescription">
            <h2>Tour Destinations</h2>
            {renderTourDestinations()}
            <button
              onClick={handleAddTourDestination}
              className="tourDataAddButton"
              style={{backgroundColor:"#fe5c24",color:"white"}}

            >
              Add Tour Destination
            </button>
          </div>
          </div>
        )}
  
        {activeTab === "tourInclusions" && (
          <div className="formContainer">
            {/* ... Existing tour inclusions content ... */}
          <div className="inputLabelFlexContainer tourTitleDescription">
            <h2>Tour Inclusions</h2>
            {renderInclusions()}
            <button onClick={handleAddInclusion} className="tourDataAddButton"             style={{backgroundColor:"#fe5c24",color:"white"}}
>
              Add Inclusion
            </button>
          </div>
          </div>
        )}
  
        {activeTab === "tourExclusions" && (
          <div className="formContainer">
            {/* ... Existing tour exclusions content ... */}
          <div className="inputLabelFlexContainer tourTitleDescription">
            <h2>Tour Exclusions</h2>
            {/* Render exclusions similarly */}
            {renderExclusions()}
            <button onClick={handleAddExclusion} className="tourDataAddButton"             style={{backgroundColor:"#fe5c24",color:"white"}}
>
              Add Exclusion
            </button>
          </div>
          </div>
        )}

        <div className="inputLabelFlexContainer tourTitleDescription">
        <p><span className="danger">*</span> Click submit only after filling details in all the tabs .</p>

          <button
            className="tourDetailsSubmitButton"
            onClick={() => {
              handleSubmit();
            }}
            style={{backgroundColor:"#fe5c24",color:"white"}}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
  
  export default TripPackage;
  