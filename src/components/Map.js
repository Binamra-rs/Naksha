
import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  return (
    <MapContainer
      center={[27.7172, 85.3240]}   // Kathmandu
      zoom={20}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
    </MapContainer>
  );
}

export default Map;