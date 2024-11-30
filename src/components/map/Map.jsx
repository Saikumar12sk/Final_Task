import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = ({ polyline, tollDetails }) => {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={13} className="Map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Polyline positions={polyline} color="blue" />
      {tollDetails.map((detail, idx) => (
        <Marker key={idx} position={[detail.latitude, detail.longitude]}>
          <Popup>{`Toll: $${detail.cost}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
