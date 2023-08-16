import React from 'react';
import './BookingConfirm.css'
import { useState,useEffect,useRef } from 'react';
import '../Navbar/Navbar'
import Navbar from '../Navbar/Navbar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser'

const BookingConfirm = () => {
    const quantity=localStorage.getItem("quantity");
    const tourId=localStorage.getItem("tourId");
    const bookingId=localStorage.getItem("bookingId");
    const[tour,setTour]=useState();
    const[booking,setBooking]=useState();

    const[newPrice,setNewPrice]=useState();
    const[destinations,setdestinations]=useState([]);
    const [pdfDownloading, setPdfDownloading] = useState(false); // Track PDF downloading


    var GetAllTours = () => {
        fetch(`http://localhost:5246/api/TourDetails/${tourId}`, {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: "Bearer " + localStorage.getItem("token"),

            // Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }).then(async (data) => {
          var myData = await data.json();
          console.log(myData);
          //   const filtered = myData.filter(booking => booking.userId === userId);
          //   console.log(filtered);
          setTour(myData);
          console.log(quantity);
          const calculatedPrice = quantity * myData.tourPrice;
          setNewPrice(calculatedPrice);
        });
      };
      useEffect(()=>{
        GetAllTours();
      },[tour])
    
    
      var GetAllDestinations = () => {
        console.log(destinations);
        fetch("http://localhost:5246/api/Destinations", {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: "Bearer " + localStorage.getItem("token"),

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
      const userEmail="suryashanmugam637@gmail.com"
      var GetBooking = () => {
        console.log(booking);
        fetch(`http://localhost:5027/api/Booking/GetBoooking?id=${bookingId}`, {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: "Bearer " + localStorage.getItem("token"),

            // Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }).then(async (data) => {
          var myData = await data.json();
          console.log(myData);
          //   const filtered = myData.filter(booking => booking.userId === userId);
          //   console.log(filtered);
          setBooking(myData);
        });
      };

      useEffect(()=>{
        GetBooking();
      },[bookingId])

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

      const getDestination = (id) => {
        console.log(id);
        const inclusion = destinations.find((item) => item.destinationId === id);
        return inclusion ? inclusion.destinationCityName : "";
      };

      
  const ticketRef = useRef(null);

//   useEffect(() => {
//     const ticketElement = ticketRef.current;

//     html2canvas(ticketElement)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('booking_ticket.pdf');
//       })
//       .catch((error) => {
//         console.error('Error generating PDF:', error);
//       });
//   },[]);

const handleDownloadPDF = () => {
    setPdfDownloading(true); // Set flag to indicate downloading

    const ticketElement = ticketRef.current;

    html2canvas(ticketElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('booking_ticket.pdf');

        const templateParams = {
          to_email: userEmail,
          message: `Dear Customer,\n \n Your payment has been successfully processed. \n Please find the attached payment receipt and your ticket. \n Thank you for choosing our service.`,
          image1_url:
            "https://img.freepik.com/free-vector/colorless-text-travel-background_23-2148056667.jpg?w=740&t=st=1691518860~exp=1691519460~hmac=cf14c637d0bb49ff4785afdd2c3c64f6c3b1c453dcf347e09cf23483a662a5d4", // Replace with actual image UR),
        };
  
        emailjs
          .send(
            "service_bebdz98",
            "template_l836dmz",
            templateParams,
  
            "tM4-6HV_ZFHjMEazV"
          )
          .then((response) => {
            console.log(userEmail);
            console.log("Email sent!", response.text);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });

        setPdfDownloading(false); // Reset flag after download
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        setPdfDownloading(false); // Reset flag after error
      });
  };


  return (
    <div >
        <header>
        <Navbar/>
        </header>
        <div style={{display:"flex",justifyContent:"flex-end" }}>
        <button
    className='my-btn'
          onClick={handleDownloadPDF}
          disabled={pdfDownloading}
          style={{ marginTop: '8rem',marginRight:"2rem",position:"fixed"}}
        >
          {pdfDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
        </div>
<div className="l-col-right ticket-wrap" aria-label="A fake boat ticket demonstrating mixing font weights and widths"
style={{marginTop:"13rem"}}
ref={ticketRef}
>
      <div className="ticket" aria-hidden="true">
        <div className="ticket__header">
          <div className="ticket__co">
            <svg className="ticket__co-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              {/* SVG content */}
            </svg>
            {/* <span className="ticket__co-name"> */}
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
                 {/* </span> */}
                 <span className="u-upper ticket__co-subname">
                 {booking && (
                            <h1 style={{ color: booking.bookingStatus === 'Completed' ? 'green' : 'red' }}>
                                {booking.bookingStatus}
                            </h1>
                        )}   
</span>
          </div>
        </div>
        {tour && (
        <div className="ticket__body">
          <p className="ticket__route">{tour.tourName}</p>
          <p className="ticket__description">{tour.tourDescription}</p>
          <div class="ticket__timing">
        <p>
          <span class="u-upper ticket__small-label">BookingId</span>
          <span class="ticket__detail">{bookingId}</span>
        </p>

        <p>
        {/* {tour.tourDestination.map((option) => (
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
        </p> */}
          {tour && tour.tourDestination && tour.tourDestination.map((option) => (
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
</p>
        <p>
          <span class="u-upper ticket__small-label">Start</span>
          <span class="ticket__detail">{getMonthAbbreviation(tour.departureDate)} {getDate(tour.departureDate)}</span>
        </p>
        <p>
          <span class="u-upper ticket__small-label">End</span>
          <span class="ticket__detail">{getMonthAbbreviation(tour.returnDate)} {getDate(tour.returnDate)}</span>
        </p>

      </div>
          <p className="ticket__fine-print">This ticket cannot be transferred to another voyage</p>
          <p className="u-upper ticket__admit">Admit {quantity} adult</p>
          <img className="ticket__barcode" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png" alt="Fake barcode" />
        </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default BookingConfirm;
