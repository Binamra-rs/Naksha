import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // <--- CRITICAL: Map looks broken without this

const Map = () => {
  return (
    // The container needs an explicit height, or the map won't show up.
    <MapContainer 
      center={[27.7172, 85.3240]} 
      zoom={20} 
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
