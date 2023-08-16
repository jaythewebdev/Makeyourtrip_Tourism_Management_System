// // import React, { useEffect, useState } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import "leaflet/dist/leaflet.css";
// // import 

// // const DubaiHotelsMap = () => {
// //   const [hotelMarkers, setHotelMarkers] = useState([]);

// //   // Fake JSON call to get hotel markers
// //   const getJSONMarkers = () => {
// //     const markers = [
// //       {
// //         name: "Shollinganallur",
// //         location: [12.901, 80.2279]
// //       }
// //       // {
// //       //   name: "Shangri-La Hotel",
// //       //   location: [25.2084, 55.2719]
// //       // },
// //       // {
// //       //   name: "Grand Hyatt",
// //       //   location: [25.2285, 55.3273]
// //       // }
// //     ];
// //     return markers;
// //   };

// //   useEffect(() => {
// //     // Fetch hotel markers data and update state
// //     const markersData = getJSONMarkers();
// //     setHotelMarkers(markersData);
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Dubai Hotels</h2>
// //       <MapContainer center={[12.901, 80.2279]} zoom={11} style={{ width: '640px', height: '480px' }}>
// //         <TileLayer
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //         />
// //         {hotelMarkers.map((hotel, index) => (
// //           <Marker key={index} position={hotel.location}>
// //             <Popup>{hotel.name}</Popup>
// //           </Marker>
// //         ))}
// //       </MapContainer>
// //     </div>
// //   );
// // };

// // export default DubaiHotelsMap;

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import leaflet library
import "leaflet/dist/leaflet.css"; // Import leaflet CSS (required)
import marker from '../Components/images/marker.png'

const App = () => {
  const customIcon = new L.Icon({
    iconUrl: marker, // Path to your custom icon image
    iconSize: [52, 52], // Set the size of the icon
    iconAnchor: [16, 32], // Set the anchor point of the icon (centered on bottom)
    popupAnchor: [0, -32], // Set the anchor point for the popup (above the icon)
  });

  return (
    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={13}
      style={{
        width: "50%",
        height: "500px",
        "margin-top": 50,
        "margin-left": 50,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[13.0827, 80.2707]} icon={customIcon}>
        <Popup>A marker displaying the location of Chennai, India</Popup>
      </Marker>
    </MapContainer>
  );
};

export default App;
