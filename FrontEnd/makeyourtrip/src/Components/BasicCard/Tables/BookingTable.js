import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingTable.css";
import { useRef } from "react";
import { Link } from "react-router-dom";

function BookingTable() {
  const [statusCounts, setStatusCounts] = useState({
    Upcoming: 0,
    Ongoing: 0,
    Completed: 0,
  });
  //   const navigate = useNavigate();
  const [Bookings, setBookings] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  const GetAllTours = async () => {
    const response = await fetch("http://localhost:5246/api/TourDetails", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchBookingsAndTourDetails = async () => {
      const tourDetailsList = await GetAllTours();

      fetch("http://localhost:5027/api/Booking/GetAllBookings", {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      }).then(async (data) => {
        const myData = await data.json();
        const filtered = myData.filter((booking) => booking.userId === userId);

        const updatedStatusCounts = {
          Upcoming: 0,
          Ongoing: 0,
          Completed: 0,
        };

        // const updatedBookings = filtered.map((booking) => ({
        //   ...booking,
        //   status: getStatus(booking, tourDetailsList),
        // }));
        const updatedBookings = filtered.map((booking) => {
          const status = getStatus(booking, tourDetailsList);
          updatedStatusCounts[status]++;
          return {
            ...booking,
            status: status,
          };
        });

        setBookings(updatedBookings);
        setStatusCounts(updatedStatusCounts);
      });
    };
    fetchBookingsAndTourDetails();
  });

  const getStatus = (booking, tourDetailsList) => {
    const currentDate = new Date();

    // Find the tour details for the booking's tourId
    const tourDetails = tourDetailsList.find(
      (details) => details.tourId === booking.tourId
    );

    if (!tourDetails) {
      return "Unknown";
    }

    const departureDate = new Date(tourDetails.departureDate);
    const returnDate = new Date(tourDetails.returnDate);

    if (currentDate < departureDate) {
      return "Upcoming";
    } else if (currentDate >= departureDate && currentDate <= returnDate) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };

  console.log(statusCounts);

  // const passengerCount=0;
  // const bookId=0;

  // new

  const [passengerCount, setPassengerCount] = useState(0);
  // const [bookId, setBookId] = useState(0);
  // const [upBookId, setUpBookId] = useState(0);
  const [bookCapacity, setBookCapacity] = useState(0);

  // useEffect(() => {
  //   console.log("bookId in useEffect", bookId);
  // }, [bookId]);
  const navigate = useNavigate();

  const handleView = (option) => {
    localStorage.setItem("bookingId", option.bookingId);
    localStorage.setItem("tourId", option.tourId);
    navigate("/tourpage/bookingpage/ticket");
  };

  
  const handleFeedback = (option) => {
    localStorage.setItem("bookingId", option.bookingId);
    localStorage.setItem("tourId", option.tourId);
    navigate("/Feedback");
  };


  const handleCancel = async (option) => {
    const passengers = option.passengers || [];
    const myBookingId = option.bookingId;

    setPassengerCount(passengers.length);
    // setBookId(option.bookingId);
    // console.log("bookId", bookId);
    // // setUpBookId(option.bookingId);
    // console.log("UpbookId", bookId);
    decreaseBookedCapacityCount(option.tourId, option.bookingId);
  };

  // console.log("UpbookId", upBookId);

  // useEffect(() => {
  //   console.log("upBookId in useEffect", upBookId);
  // }, [upBookId]);

  // useEffect(() => {
  //   prevBookIdRef.current = bookId;
  // }, [bookId]);

  // const handleCancel = (option) => {
  //   const passengers = option.passengers || [];
  //   const myBookingId = option.bookingId;

  //   setPassengerCount(passengers.length);

  //   if (prevBookIdRef.current !== myBookingId) {
  //     // Only update bookId if it's different from the previous value
  //     // setBookId(myBookingId);
  //     // setUpBookId(myBookingId);
  //   }
  //   decreaseBookedCapacityCount(option.tourId);
  // };

  const decreaseBookedCapacityCount = (id, bId) => {
    // setUpTourId(id);
    getCountFromTour(id);
    deleteBooking(bId);
  };

  const getCountFromTour = async (id) => {
    fetch(`http://localhost:5246/api/TourDetails/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      const calculatedCount = parseInt(data.bookedCapacity) - passengerCount;
      setBookCapacity(calculatedCount);
      changeBookedCount(id, calculatedCount);
    });
  };

  const changeBookedCount = async (tourId, capacity) => {
    fetch(`http://localhost:5246/api/TourDetails`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tourId: tourId,
        bookedCapacity: capacity,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);

        // Handle response data if needed
      })
      .catch((err) => {
        console.log(err.error);
      });
  };

  const deleteBooking = async (bId) => {
    // console.log("UpbookId in fetch", upBookId);
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      // let JwtToken = localStorage.getItem("token");
      await fetch(`http://localhost:5027/api/Booking/UpdateBookingStatus`, {
        method: "PUT",
        headers: {
          accept: "text/plain",
          // Authorization: "Bearer " + JwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bId,
          bookingStatus: "Cancelled",
        }),
      })
        .then(async (data) => {
          var myData = await data.json();
          console.log(myData);
          alert("cancelled");
          // toast.success("Status Updated Successfully");
        })
        .catch((err) => {
          console.log(err.error);
        });
    }
  };

  return (
    <div>
      <div className="card-body">
        <h5 className="card-title">Your Bookings</h5>

        {/* <div className="Org-Dash-admin-pan"> */}
        <div className="Org-Dash-patient-table">
          <table className="Org-Dash-fl-table">
            <thead>
              <tr>
                <th scope="col">Booking ID</th>
                <th scope="col">Tour ID</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Tour Status</th>
                <th scope="col">View</th>
                <th scope="col">Feedback</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {Bookings.length === 0 ? (
                <tr id="col">
                  <td colSpan="7">No data available</td>
                </tr>
              ) : (
                Bookings.map((option) => (
                  <tr key={option.bookingId}>
                    <td>{option.bookingId}</td>
                    <td>{option.tourId}</td>
                    <td>{option.bookingDate}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          option.status === "Completed"
                            ? "success"
                            : option.status === "Upcoming"
                            ? "warning"
                            : option.status === "Ongoing"
                            ? "danger"
                            : "alert"
                        }`}
                        style={{
                          width: "5rem",
                          height: "1.5rem",
                          textAlign: "center",
                          padding: "0.35rem",
                        }}
                      >
                        {option.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleView(option);
                        }}
                        className="my-btn my-btn-green"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button 
                                     onClick={() => {
                                      handleFeedback(option);
                                    }}
                        className={`my-btn my-btn-blue ${
                          option.status !== "Completed" ? "disabled-btn" : ""
                        }`}
                        disabled={option.status !== "Completed"}
                      >
                        Feedback
                      </button>
                    </td>
                    <td>
                      {/* <button
                        className={`my-btn my-btn-red ${
                          option.status !== "Upcoming" ? "disabled-btn" : ""
                        }`}
                        disabled={option.status !== "Upcoming"}
                        onClick={() => handleCancel(option)}
                      >
                        Cancel
                      </button> */}
                      <button
                        className={`my-btn my-btn-red ${
                          option.status !== "Upcoming" ||
                          option.bookingStatus === "Cancelled"
                            ? "disabled-btn"
                            : ""
                        }`}
                        disabled={
                          option.status !== "Upcoming" ||
                          option.bookingStatus === "Cancelled"
                        }
                        onClick={() => {
                          // setUpBookId(option.bookingId);
                          handleCancel(option);
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {/* {filtered.map((option) => (
            <tr key={option.bookingId}>
              <th scope="row">
                {option.tourId}
              </th>
              <td>{option.bookingDate}</td>
              <td>
              <span
                  className={`badge bg-${
                    option.bookingStatus === "Completed"
                      ? "success"
                      : option.bookingStatus === "Pending"
                      ? "warning"
                      : "danger"
                  }`}
                >
                  {option.bookingStatus}
                </span>
              </td>
              <td>
                
              </td>
              <td>

              </td>
              <td>

              </td>
            </tr>
          ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    //   </div>
  );
}

export default BookingTable;
