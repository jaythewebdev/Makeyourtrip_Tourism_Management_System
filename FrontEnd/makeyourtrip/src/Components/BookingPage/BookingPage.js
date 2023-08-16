import { AiOutlineInfoCircle } from "react-icons/ai";
import Footer from "../Footer/Footer";
import "../LandingPage/LandingPage.css";
import Navbar from "../Navbar/Navbar";
import "../TourPage/TourPage.css";
import { useEffect,useState } from "react";
import { Button, Input, Select } from "antd";
import OTPModal from "../OTPModal/OTPModal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import BookingOTPModal from "../BookingModals/BookingOTPModal";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const [newPrice, setNewPrice] = useState();
  const[tour,setTour]=useState();
  const[destinations,setdestinations]=useState([]);
  const [quantity, setQuantity] = useState(localStorage.getItem("quantity"));

  const [booking, setBooking] = useState({
    tourId: localStorage.getItem('tourId'),
    userId:  localStorage.getItem('userId'),
    bookingDate: new Date().toISOString(),
    pickupPoint: "",
    additionalRequests: "",
    passengers: [
      {
        name: "",
        age: "",
        gender: "",
      },
    ],
    payments: [
      {
        paymentDay: new Date().toISOString(),
        paymentAmount: 0,
        discountAmount: 0,
        walletAmount: 0,
        netPayableAmount: 0,
        },
    ],
  });
  const handlePassengerChange = (index, field, value) => {
    setBooking((prevBooking) => {
      const updatedPassengers = [...prevBooking.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: value,
      };
      return {
        ...prevBooking,
        passengers: updatedPassengers,
      };
    });
  };

  const GetAllTours = () => {
    
    fetch(`http://localhost:5246/api/TourDetails/${localStorage.getItem("tourId")}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
    })
      .then(async (response) => {
        if (response.ok) {
          const myData = await response.json();
          setTour(myData);
          console.log(myData);

          const calculatedPrice = quantity * myData.tourPrice;
          setNewPrice(calculatedPrice);
         

          const newBookedCapacity=myData.bookedCapacity + parseInt(quantity);
          localStorage.setItem("bookedCapacity",newBookedCapacity);

          console.log(myData.bookedCapacity);
          console.log(newBookedCapacity);
          const initialPayments = [
            {
              paymentDay: new Date().toISOString(),
              paymentAmount: calculatedPrice,
              discountAmount: 0,
              walletAmount: 0,
              netPayableAmount: calculatedPrice,
            },
          ];

          setBooking((prevBooking) => ({
            ...prevBooking,
            payments: initialPayments,
          }));

        } else {
          console.error("Failed to fetch tour data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching tour data:", error);
      });
  };

  useEffect(() => {
    GetAllTours();
  }, [quantity]);

  const GetAllDestinations = () => {
    fetch("http://localhost:5246/api/Destinations", {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
    })
      .then(async (data) => {
        var myData = await data.json();
        setdestinations(myData);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  };

  useEffect(() => {
    GetAllDestinations();
  }, []);

  const getDestination = (id) => {
    const inclusion = destinations.find(
      (item) => item.destinationId === id
    );
    return inclusion ? inclusion.destinationCityName : "";
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { weekday: "long" });
  };

  const getMonthAbbreviation = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "short" });
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const generatePassengerFields = () => {
    return Array.from({ length: quantity }, (_, index) => (
      <div key={index} style={{ marginBottom: "1rem" }}>
        <h6>Person {index + 1} Details</h6>
        <Input
          placeholder="Passenger Name"
          value={booking.passengers[index]?.name || ""}
          onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Age"
          value={booking.passengers[index]?.age || ""}
          onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
          style={{ margin: "1rem 0rem" }}
        />
        <Select
          value={booking.passengers[index]?.gender || ""}
          onChange={(value) =>
            handlePassengerChange(index, "gender", value)
          }
          style={{ width: "150px" }}
        >
          <Select.Option value="">Select Gender</Select.Option>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </div>
    ));
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const allPassengerFieldsFilled = booking.passengers.every(
      (passenger) =>
        passenger.name.trim() !== "" &&
        passenger.age !== "" &&
        passenger.gender !== ""
    );

    setIsSubmitDisabled(!allPassengerFieldsFilled || !booking.pickupPoint);
  }, [booking.passengers, booking.pickupPoint]);

  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

  const handleSubmit = () => {
    MakeBooking();
    setIsOTPModalOpen(true);
  };

  // const MakeBooking = () => {
  //   fetch("http://localhost:5027/api/Booking/AddBooking", {
  //     method: "POST",
  //     headers: {
  //       accept: "text/plain",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...booking }),
  //   })
  //     .then(async (data) => {
  //       var myData = await data.json();
  //       console.log(myData);
  //       localStorage.setItem("bookingId",myData.bookingId);
  //       const paymentId = myData.payments[0].paymentId;
  //       console.log(paymentId);
  //       localStorage.setItem("paymentId",paymentId);
  //     })
  //     .catch((err) => {
  //       console.error("Error making booking:", err);
  //     });
  // };
  const navigate = useNavigate();

  const MakeBooking = () => {
    console.log(booking);
    fetch("http://localhost:5027/api/Booking/AddBooking", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

      },
      body: JSON.stringify({ ...booking }),
    })
      .then(async (data) => {
        if (!data.ok) {
          throw new Error("Failed to make booking");
        }
        var myData = await data.json();
        console.log(myData);
        localStorage.setItem("bookingId", myData.bookingId);
        const paymentId = myData.payments[0].paymentId;
        console.log(paymentId);
        localStorage.setItem("paymentId", paymentId);
      })
      .catch((err) => {
        console.error("Error making booking:", err);
        alert("Booking Failed");
        // Navigate back to the previous page
        navigate(-1); // Navigate back one step in the history
      });
  };
  
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <headers>
        <Navbar />
      </headers>
      {tour && (
      <div
        className="search-main-pan"
        id="tour-main-pan"
        style={{ marginTop: "3.5rem" }}
      >
        <div
          className="main-div-2"
          id="tour-main-div-2"
          style={{ marginTop: "3rem" }}
        >
          <div className="tour-div-1-filter-1" id="tour-main-div-filter-1">
            <h1>{tour.tourName}</h1>
            <h6>A tour to explore the prominent sites with a guide</h6>
          </div>
          <div className="tour-div-1-filter-1" id="tour-main-div-filter-1">
            <h3>Passenger Details</h3>
            <h6>Please fill all the fields .</h6>
              {generatePassengerFields()}
          </div>
          <div className="tour-div-1-filter-1" id="tour-main-div-filter-1">
            <h3>Additional Details</h3>
<Select
  value={booking.pickupPoint}
  onChange={(value) => setBooking({ ...booking, pickupPoint: value })}
  style={{ width: '100%', margin: '1rem 0rem' }}
>
  <Select.Option value="">Select Pickup Point</Select.Option>
  {tour.pickupPoints.map((point) => (
    <Select.Option key={point.pickupPointId} value={point.location}>
      {point.location}
    </Select.Option>
  ))}
</Select>

      <Input
        placeholder="Additional Requests"
        type="text"
        value={booking.additionalRequests || ''}
        onChange={(value) => setBooking({ ...booking, additionalRequests: value.target.value })}
        style={{ width: '100%', margin: '1rem 0rem' }}
      />
          </div>
          <div className="tour-div-1-filter-1" id="tour-main-div-filter-1">
            <h2>Destinations</h2>
            <div
              className="dest-main"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              {tour.tourDestination.map((option) => (
                <div
                  style={{
                    width: "6rem",
                    height: "2.4rem",
                    padding: "0.4rem",
                    border: "2px solid gray",
                    borderRadius: "3rem",
                    textAlign: "center",
                  }}
                >
                  {getDestination(option.destinationId)}
                </div>
              ))}
            </div>
          </div>
          <div className="tour-div-1-filter-1" id="tour-main-div-filter-2">
            <div className="tour-mini-div-1">
              <h4 style={{ color: "green" }}>
                {tour.cancellationPolicy} Cancellation Available
              </h4>
              <p>When cancelled more than 24 hours before the start time</p>
            </div>
          </div>

          <div className="tour-div-1-filter-1" id="tour-main-div-filter-6">
            <h4>Languages spoken by guide</h4>
            <div
              style={{
                width: "6rem",
                height: "2.4rem",
                padding: "0.4rem",
                border: "2px solid gray",
                borderRadius: "3rem",
                textAlign: "center",
              }}
            >
              <h6>English</h6>
            </div>
          </div>
        </div>
        <div
          className="main-div-1"
          id="tour-main-div-1"
          style={{ backgroundColor: "#fff", marginTop: "3rem" }}
        >
          <div
            className="tour-div-1-filter-1"
            style={{ paddingLeft: "0", paddingTop: "1rem" }}
          >
            <h2>Summary</h2>
            <p style={{ fontSize: "1.3rem" }}></p>
          </div>
          <div
            className="tour-div-1-filter-1"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "0",
            }}
          >
            <div>
              <div
                style={{
                  border: "1px solid grey",
                  textAlign: "center",
                  borderRadius: "8px",
                  height: "12rem",
                  width: "12rem",
                  backgroundImage: `url(${tour.imageUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
            </div>
            <div>
              <h3>{tour.tourName}</h3>
              <div>
                <p>
                  {getDay(tour.departureDate)}, {getDate(tour.departureDate)}{" "}
                  {getMonthAbbreviation(tour.departureDate)}
                </p>
                <p>{quantity} X Standard Ticket</p>
                <h4>${newPrice} /-</h4>
              </div>
            </div>
          </div>
          <div
            className="tour-div-1-filter-1"
            style={{ padding: "1rem", border: "1px solid gray" }}
          >
            <h4>{quantity} X Standard Ticket</h4>
            <div
              className="tour-div-1-filter-1"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0",
              }}
            >
              <div>
                <p>{quantity} X Person</p>
              </div>
              <div>
                <div class="input-group">
                  <p>${newPrice}</p>
                </div>
              </div>
            </div>
            <div
              className="tour-div-1-filter-1"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0",
                paddingTop: "0",
              }}
            >
              <div>
                <div>
                  <span>Total Price</span>
                </div>
              </div>
              <div>
                <h5>${newPrice}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="submit-button" style={{width:"90%",margin:"auto" }}>
        <Button type="primary" onClick={handleSubmit} disabled={isSubmitDisabled} style={{width:"100%",height:"3rem"}}>
          <h4>Book</h4>
        </Button>

        </div>
        {isOTPModalOpen && (
        <BookingOTPModal onClose={() => setIsOTPModalOpen(false)} />
      )}
      <footer style={{ marginTop: "3rem" }}>
        <Footer />
      </footer>
    </div>
  );
}

export default BookingPage;

