import React, { useState, useEffect, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap,
  useMapEvents 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { saveMarkerToDB, fetchMarkersFromDB } from './MarkerService';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const createCustomIcon = (type) => {
  const colors = {
    issue: '#D32F2F',   
    help: '#FBC02D',     
    donation: '#388E3C', 
  };
  const iconSymbols = {
      issue: '!',
      help: '?',
      donation: '$'
  };

  const color = colors[type] || colors.issue; 
  const symbol = iconSymbols[type] || '!';

  const svgHtml = `
    <svg width="30" height="45" viewBox="0 0 30 45" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 11 15 30 15 30s15-19 15-30c0-8.3-6.7-15-15-15z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="15" cy="15" r="6" fill="#FFFFFF"/>
      <text x="15" y="${type === 'donation' ? '19' : '20'}" font-size="${type === 'donation' ? '12' : '14'}" text-anchor="middle" fill="${color}" font-family="Arial" font-weight="bold">
        ${symbol}
      </text>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-map-pin',
    html: svgHtml,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
  });
};


function UserLocationMarker({ setUnconfirmedMarker, canPlaceMarker }) {
  const [position, setPosition] = useState(null);
  const map = useMap(); 

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom()); 
    });
  }, [map]);

  const handleReportMyLocation = () => {
      if (!canPlaceMarker) return; 

      const newMarker = {
          id: Date.now(),
          position: position,
          type: 'issue',
          desc: 'Report initiated from current location.',
      };
      setUnconfirmedMarker(newMarker);
  };

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        📍 **You are here**
        <br />
        {canPlaceMarker ? (
            <button 
                onClick={handleReportMyLocation}
                style={styles.buttonSmall}
            >
                Report Issue Here
            </button>
        ) : (
            <p style={{ color: 'gray', margin: 0 }}>Processing report...</p>
        )}
      </Popup>
    </Marker>
  );
}


function ReportMarker({ unconfirmedMarker, setUnconfirmedMarker, setConfirmedMarkers, startCooldown }) {
  const markerRef = useRef(null);
  const [reportType, setReportType] = useState(unconfirmedMarker.type || 'issue');
  const [description, setDescription] = useState(unconfirmedMarker.desc || '');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [unconfirmedMarker]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide a description!");
      return;
    }

    setIsSubmitting(true);

    const markerData = {
      position: unconfirmedMarker.position,
      type: reportType,
      desc: description.trim(),
    };

    try {
        const result = await saveMarkerToDB(markerData);

        if (result.success) {
            
            const finalMarker = { ...markerData, id: result.id }; 
            setConfirmedMarkers(prevMarkers => [...prevMarkers, finalMarker]);
        }

        setUnconfirmedMarker(null); 
        startCooldown();

    } catch (error) {
        console.error("Failed to submit report:", error);
        alert(`Failed to save report: ${error.message}`);

    } finally {
        setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    startCooldown();
    setUnconfirmedMarker(null); 
  };

  return (
    <Marker 
      ref={markerRef} 
      position={unconfirmedMarker.position} 
      icon={new L.Icon.Default()} 
    >
      <Popup closeOnClick={false} autoClose={false} className="report-popup">
        <form onSubmit={handleFormSubmit} style={styles.form}>
            <h4>Confirm Report Location</h4>

            <label>Report Type:</label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              style={styles.input}
              disabled={isSubmitting}
            >
              <option value="issue">Issue (Red)</option>
              <option value="help">Help Required (Yellow)</option>
              <option value="donation">Donation (Green)</option>
            </select>

            <label>Description:</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is the issue/need?"
              required
              rows="3"
              style={styles.textarea}
              disabled={isSubmitting}
            />

            <button type="submit" style={styles.button} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Submit'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel} 
              style={{ ...styles.button, backgroundColor: '#ccc', marginLeft: '10px' }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
        </form>
      </Popup>
    </Marker>
  );
}


function MapClickHandler({ setUnconfirmedMarker, canPlaceMarker }) {
  useMapEvents({
    click: (e) => {
        if (!canPlaceMarker) {
            return; 
        }

        const newMarker = {
            id: Date.now(),
            position: e.latlng,
            type: 'issue',
            desc: '',
        };

        setUnconfirmedMarker(newMarker);
    },
  });
  return null; 
}


const CommunityMap = () => {

  const [confirmedMarkers, setConfirmedMarkers] = useState([]);


  const [unconfirmedMarker, setUnconfirmedMarker] = useState(null);


  const [canPlaceMarker, setCanPlaceMarker] = useState(true);

  const pollIntervalRef = useRef(null);

  const fetchMarkers = async () => {
    try {
      const markers = await fetchMarkersFromDB();
      setConfirmedMarkers(markers);
    } catch (error) {
      console.error("Error polling markers:", error);
    }
  };

  useEffect(() => {
    fetchMarkers();

    pollIntervalRef.current = setInterval(() => {
      fetchMarkers();
    }, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const startCooldown = () => {
      setCanPlaceMarker(false);
      setTimeout(() => {
          setCanPlaceMarker(true);
      }, 300); 
  };

  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={16} 
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <UserLocationMarker 
          setUnconfirmedMarker={setUnconfirmedMarker}
          canPlaceMarker={canPlaceMarker && !unconfirmedMarker}
      />

      <MapClickHandler 
          setUnconfirmedMarker={setUnconfirmedMarker} 
          canPlaceMarker={canPlaceMarker && !unconfirmedMarker} 
      />

      {unconfirmedMarker && (
        <ReportMarker 
            unconfirmedMarker={unconfirmedMarker} 
            setUnconfirmedMarker={setUnconfirmedMarker} 
            setConfirmedMarkers={setConfirmedMarkers}
            startCooldown={startCooldown} 
        />
      )}

      {}
      {confirmedMarkers.map((marker) => {
        if (!marker.position || marker.position.lat === undefined || marker.position.lng === undefined) {
          console.warn("Skipping marker with invalid coordinates:", marker);
          return null;
        }
        return (
          <Marker 
              key={marker.id} 
              position={[marker.position.lat, marker.position.lng]} 
              icon={createCustomIcon(marker.type)} 
          >
            <Popup>
              **{marker.type.toUpperCase()}** <br />
              {marker.desc}
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
};

export default CommunityMap;

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
    },
    textarea: {
        marginBottom: '15px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        resize: 'vertical',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        padding: '8px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonSmall: {
        padding: '5px 10px',
        backgroundColor: '#1E90FF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '5px'
    }
};