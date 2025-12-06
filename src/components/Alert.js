// src/components/Alerts.js

import React from 'react';

const alertContainerStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '0 20px',
};

const alertItemStyle = (status) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '15px 20px',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  marginBottom: '15px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s',
  borderLeft: `5px solid ${statusColors[status] || '#6c757d'}`,
});

const statusColors = {
  CRITICAL: '#dc3545', 
  WARNING: '#ffc107',  
  INFO: '#007bff',     
};

const StatusBadge = ({ status }) => (
  <span style={{
    backgroundColor: statusColors[status] || '#6c757d',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '70px',
    textAlign: 'center',
    marginRight: '20px' 
  }}>
    {status}
  </span>
);

const mockAlerts = [
  { id: 1, status: 'CRITICAL', title: 'Earthquake alert', time: '5 minutes ago' },
];

function Alerts() {
  return (
    <div style={alertContainerStyle}>
      <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px', color: '#343a40' }}>Active City Alerts</h1>

      {mockAlerts.map(alert => (
        <div key={alert.id} style={alertItemStyle(alert.status)}>
          <StatusBadge status={alert.status} />
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#343a40' }}>{alert.title}</h3>
            <p style={{ margin: '3px 0 0 0', fontSize: '14px', color: '#6c757d' }}>{alert.time}</p>
          </div>
        </div>
      ))}
      
      <p style={{ textAlign: 'center', marginTop: '40px', color: '#6c757d' }}>
        For detailed information on any alert, please refer to the main announcement board.
      </p>
    </div>
  );
}

export default Alerts;