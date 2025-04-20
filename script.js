// Ganti 'YOUR_TOKEN' dengan token API dari ipinfo.io
const token = '61a9f4028ff397';

fetch(`https://ipinfo.io/json?token=${token}`)
  .then(response => response.json())
  .then(data => {
    const info = document.getElementById('info');
    info.innerHTML = `
      <strong>IP:</strong> ${data.ip}<br/>
      <strong>Kota:</strong> ${data.city}<br/>
      <strong>Wilayah:</strong> ${data.region}<br/>
      <strong>Negara:</strong> ${data.country}<br/>
      <strong>Lokasi:</strong> ${data.loc}
    `;
    // Menampilkan peta menggunakan Leaflet.js
    const [lat, lon] = data.loc.split(',');
    const mapDiv = document.getElementById('map');
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const map = L.map('map').setView([lat, lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
    };
    document.body.appendChild(script);
  })
  .catch(error => console.error('Error fetching data:', error));