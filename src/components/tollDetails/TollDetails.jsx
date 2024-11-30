import React from 'react';
import './TollDetails.css';

const TollDetails = ({ tollDetails }) => {
  return (
    <div className="TollDetails">
      <h2>Toll Details</h2>
      <ul>
        {tollDetails.map((detail, idx) => (
          <li key={idx}>{`Toll Booth ${idx + 1}: $${detail.cost}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default TollDetails;
