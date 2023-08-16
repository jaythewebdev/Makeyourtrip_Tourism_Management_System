import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import AdminNavbar from "../Navbar/AgentNavbar";
import AgentNavbar from "../Navbar/AgentNavbar";

function TourPackage() {
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
        destinationimage: "",
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
          <h4>Daily Schedules</h4>
          {renderDailySchedules(itineraryIndex)}
          <button
            onClick={() => handleAddDailySchedule(itineraryIndex)}
            className="tourDataAddButton"
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
      destinationimage: "",
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
          <div>
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
          </div>
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
          <input
            className="addTourInputField"
            value={exclusion.exclusionId}
            onChange={(e) => handleExclusionChange(index, e.target.value)}
          />
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
      })
      .catch((err) => {
        console.log(err.error);
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
  },[destinations])

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
  },[Inclusion])

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
  },[Exclusion])

  return (
    <div className="TourPackage">
      <header>
        <AgentNavbar/>
        </header>

      <div className="CreateTourHeader" style={{marginTop:"8rem"}}>
        <div>
          <h1 style={{textAlign:"center"}}>Create a tour package</h1>
        </div>
      </div>

      <div className="formContainer">
        <div className="column">
        <div className="tourTitleDescription">
        <div className="inputLabelFlexContainer ">
        <h3>General Details</h3>

          <label className="addTourInputLable">Tour Name</label>
          <input
            className="addTourInputField tourTitleInputField"
            type="text"
            placeholder="Title for tour"
            onChange={(e) =>
              setTourPackage({ ...tourPackage, tourName: e.target.value })
            }
          />
        </div>
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
      </div>

      {/* normal-2 */}

      <div className="tourTitleDescription">
        <div className="inputLabelFlexContainer">
          <label className="addTourInputLable">Tour Type</label>
          <input
            type="text"
            className="addTourInputField"
            onChange={(e) =>
              setTourPackage({ ...tourPackage, tourType: e.target.value })
            }
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
        <div className="inputLabelFlexContainer">
          <label className="addTourInputLabel">Departure Date:</label>
          <input
            className="addTourInputField"
            type="date"
            placeholder="Tour Name"
            onChange={(e) =>
              setTourPackage({ ...tourPackage, departureDate: e.target.value })
            }
          />
        </div>
        <div className="inputLabelFlexContainer">
          <label className="addTourInputLabel">Return Date:</label>
          <input
            className="addTourInputField"
            type="date"
            placeholder="Tour Name"
            onChange={(e) =>
              setTourPackage({ ...tourPackage, returnDate: e.target.value })
            }
          />
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
          <label className="addTourInputLabel">Image: </label>
          <input
            className="addTourInputField"
            type="text"
            placeholder="Tour Name"
            onChange={(e) =>
              setTourPackage({ ...tourPackage, imageUrl: e.target.value })
            }
          />
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
        </div>
        <div className="column">
        <div className="inputLabelFlexContainer tourTitleDescription">
        {renderPickupPoints()}
        <button onClick={handleAddPickupPoint} className="tourDataAddButton">
          Add Pickup Point
        </button>
      </div>
      {/* Render other sections similarly */}
      <div className="inputLabelFlexContainer tourTitleDescription">
        <div className="inputLabelFlexContainer tourTitleDescription">
          <h2>Itineraries</h2>
          {renderItineraries()}
        </div>
      </div>
      {/* Render other sections similarly */}
      <div className="inputLabelFlexContainer tourTitleDescription">
        <div className="inputLabelFlexContainer tourTitleDescription">
          <h2>Tour Destinations</h2>
          {renderTourDestinations()}
          <button
            onClick={handleAddTourDestination}
            className="tourDataAddButton"
          >
            Add Tour Destination
          </button>
        </div>
      </div>

      {/* Render other sections similarly */}

      <div className="inputLabelFlexContainer tourTitleDescription">
        <div className="inputLabelFlexContainer tourTitleDescription">
          <h2>Tour Inclusions</h2>
          {renderInclusions()}
          <button onClick={handleAddInclusion} className="tourDataAddButton">
            Add Inclusion
          </button>
        </div>
        <div className="inputLabelFlexContainer tourTitleDescription">
          <h2>Tour Exclusions</h2>
          {/* Render exclusions similarly */}
          {renderExclusions()}
          <button onClick={handleAddExclusion} className="tourDataAddButton">
            Add Exclusion
          </button>
        </div>
      </div>

        </div>
      </div>

      {/* normal-1 */}
      
      <div className="inputLabelFlexContainer tourTitleDescription">
        <button
          className="tourDetailsSubmitButton"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TourPackage;
