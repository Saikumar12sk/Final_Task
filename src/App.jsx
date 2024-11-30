import React, { useState } from 'react';
import TollCalculatorForm from './components/tollCalculatorForm/TollCalculatorForm';
import Map from './components/map/Map';
import TollDetails from './components/tollDetails/TollDetails';
import './App.css';

const App = () => {
  const [routeData, setRouteData] = useState(null); // For polyline and toll details

  const handleRouteData = (data) => {
    setRouteData(data);
  };

  return (
    <div className="App">
      <h1>Toll Calculator Application</h1>
      <TollCalculatorForm onRouteData={handleRouteData} />
      {routeData && (
        <>
          <TollDetails tollDetails={routeData.tollDetails} />
          <Map polyline={routeData.polyline} tollDetails={routeData.tollDetails} />
        </>
      )}
    </div>
  );
};

export default App;
