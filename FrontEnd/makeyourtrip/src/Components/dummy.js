import React, { useState, useEffect } from 'react';

const TourDestinationForm = ({ onAddTourDestinations }) => {
  // Dummy data for destination options
  const dummyDestinationOptions = [
    { destinationId: 1, destinationName: 'City of Wonders' },
    { destinationId: 2, destinationName: 'Beach Paradise' },
    { destinationId: 3, destinationName: 'Mountain Retreat' },
    // Add more dummy options as needed
  ];

  const [destinationOptions, setDestinationOptions] = useState(dummyDestinationOptions);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [tourDestination, setTourDestination] = useState({
    destinationId: '',
    description: '',
    imageUrl: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTourDestination((prevTourDestination) => ({
      ...prevTourDestination,
      [name]: value,
    }));
  };

  const handleAddDestination = () => {
    if (selectedDestination === '') return;

    const newDestination = {
      destinationId: selectedDestination,
      description: tourDestination.description,
      imageUrl: tourDestination.imageUrl,
    };

    setDestinations([...destinations, newDestination]);
    setTourDestination({
      destinationId: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleAddTourDestinations = () => {
    console.log(destinations);
  };

  return (
    <div>
      <h2>Add Tour Destinations</h2>
      <div>
        <label>Select Destination:</label>
        <select
          name="selectedDestination"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <option value="">Select a destination</option>
          {destinationOptions.map((option) => (
            <option key={option.destinationId} value={option.destinationId}>
              {option.destinationName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={tourDestination.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={tourDestination.imageUrl}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddDestination}>Add Destination</button>
      {destinations.map((destination, index) => (
        <div key={index}>
          <p>Destination Name: {destination.destinationId}</p>
          <p>Description: {destination.description}</p>
          <p>Image URL: {destination.imageUrl}</p>
        </div>
      ))}
      <button onClick={handleAddTourDestinations}>Add Destinations</button>
    </div>
  );
};

export default TourDestinationForm;

