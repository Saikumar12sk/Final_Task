import React, { useState } from 'react';
import './TollCalculatorForm.css'; 

const TollCalculatorForm = ({ onRouteData }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const response = await fetch('http://localhost:5000/proxy/tollguru', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: startLocation, end: endLocation }),
          });
          
  
          if (!response.ok) {
            const errorMessage = await response.text(); // Fetch the error message
            throw new Error(`Server error: ${response.status} - ${errorMessage}`);
          }
      const data = await response.json();
  
      const decodedPolyline = decodePolyline(data.route.polyline); // Ensure decodePolyline is defined
      onRouteData({
        polyline: decodedPolyline,
        tollDetails: data.route.tollDetails,
      });
    } catch (error) {
      console.error('Error fetching toll data:', error);
    }
  };
  

  return (
    <form className="TollCalculatorForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Start Location"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Location"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
      />
      <button type="submit">Calculate Toll</button>
    </form>
  );
};

export default TollCalculatorForm;
