import L from 'leaflet';


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

/**
 * @param {string} type - 'issue', 'help', or 'donation'.
 */
const createCustomIcon = (type) => {
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


export { createCustomIcon };