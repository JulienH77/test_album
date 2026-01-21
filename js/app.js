// ======================================================
// STATE
// ======================================================
const state = {
  selectedTrip: null,
  selectedCity: null
};

// ======================================================
// INIT MAP
// ======================================================
const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

// ======================================================
// LEAFLET LAYERS (ordre important)
// ======================================================
const trajetLayer = L.layerGroup().addTo(map); // en dessous
const cityLayer   = L.layerGroup().addTo(map); // au dessus
const photoLayer  = L.layerGroup().addTo(map); // pas encore utilisé

// ======================================================
// LOAD TRAJETS GEOJSON
// ======================================================
let trajetsGeoJSON = null;

fetch("data/GEOJSON/TRAJETS_ALL_vacances_wgs.geojson")
  .then(r => {
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  })
  .then(data => {
    trajetsGeoJSON = data;
  })
  .catch(err => console.error("Erreur chargement trajets :", err));

// ======================================================
// TRAJET STYLE
// ======================================================
function trajetStyle(feature) {
  const colors = {
    avion: "#00dbc5",
    train: "#db0016",
    bus: "#dbc500",
    voiture: "#0016db",
    bateau: "#0084db"
  };

  return {
    color: colors[feature.properties.trajet] || "#666",
    weight: 3,
    opacity: 1
  };
}

// ======================================================
// SHOW TRAJETS FOR ONE TRIP
// ======================================================
function showTrajetsForTrip(trip) {
  trajetLayer.clearLayers();
  if (!trajetsGeoJSON) return;

  L.geoJSON(trajetsGeoJSON, {
    style: trajetStyle,
    filter: f => f.properties.voyage === trip.name
  }).eachLayer(l => trajetLayer.addLayer(l));
}

// ======================================================
// SHOW CITIES
// ======================================================
function showCities(trip) {
  cityLayer.clearLayers();

  trip.cities.forEach(city => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 7,
      fillColor: "#fff",
      fillOpacity: 1,
      color: "#000",
      weight: 3
    });

    marker.on("click", () => {
      const cityDiv = document.querySelector(`[data-city="${city.id}"]`);
      toggleCity(city, cityDiv);
    });

    cityLayer.addLayer(marker);
  });
}

// ======================================================
// DOM ELEMENTS
// ======================================================
const tripListEl = document.getElementById("trip-list");
const contentEl  = document.getElementById("content-section");

// ======================================================
// RENDER TRIPS
// ======================================================
travels.forEach(trip => {
  const li = document.createElement("li");
  li.textContent = trip.name;

  li.addEventListener("click", () => selectTrip(trip, li));
  tripListEl.appendChild(li);
});

// ======================================================
// SELECT TRIP
// ======================================================
function selectTrip(trip, li) {
  state.selectedTrip = trip;
  state.selectedCity = null;

  document.querySelectorAll("#trip-list li")
    .forEach(el => el.classList.remove("active"));
  li.classList.add("active");

  contentEl.innerHTML = "";

  showTrajetsForTrip(trip);
  showCities(trip);
  renderCities();
  zoomToTrip(trip);
}

// ======================================================
// RENDER CITIES SIDEBAR
// ======================================================
function renderCities() {
  contentEl.innerHTML = "";

  state.selectedTrip.cities.forEach(city => {
    const cityDiv = document.createElement("div");
    cityDiv.className = "city";
    cityDiv.dataset.city = city.id;

    const header = document.createElement("div");
    header.className = "city-header";
    header.textContent = city.name;

    header.addEventListener("click", () => toggleCity(city, cityDiv));

    cityDiv.appendChild(header);
    contentEl.appendChild(cityDiv);
  });
}

// ======================================================
// TOGGLE CITY
// ======================================================
function toggleCity(city, cityDiv) {
  if (state.selectedCity?.id === city.id) {
    closeCities();
    return;
  }

  closeCities();
  state.selectedCity = city;

  const gallery = document.createElement("div");
  gallery.className = "city-gallery";

  city.days.forEach(day => {
    const dayBlock = document.createElement("div");
    dayBlock.className = "day-block";

    const title = document.createElement("div");
    title.className = "day-title";
    title.textContent = formatDate(day.date);
    dayBlock.appendChild(title);

    day.photos.forEach(photo => {
      const item = document.createElement("div");
      item.className = "photo-item";

      const img = document.createElement("img");
      img.src = photo.src;
      img.addEventListener("click", () => openPhotoPopup(photo));

      const desc = document.createElement("div");
      desc.className = "photo-desc";
      desc.textContent = photo.desc;

      item.appendChild(img);
      item.appendChild(desc);
      dayBlock.appendChild(item);
    });

    gallery.appendChild(dayBlock);
  });

  cityDiv.appendChild(gallery);
  zoomOnCity(city);
}

// ======================================================
// CLOSE ALL CITIES
// ======================================================
function closeCities() {
  document.querySelectorAll(".city-gallery").forEach(el => el.remove());
  state.selectedCity = null;
}

// ======================================================
// MAP HELPERS
// ======================================================
function zoomToTrip(trip) {
  const bounds = L.latLngBounds(
    trip.cities.map(c => [c.lat, c.lng])
  );
  map.fitBounds(bounds.pad(0.3));
}

function zoomOnCity(city) {
  map.setView([city.lat, city.lng], 10);
}

// ======================================================
// PHOTO POPUP
// ======================================================
function openPhotoPopup(photo) {
  if (!photo.coords) return;

  const dateObj = extractDateFromFilename(photo.src);
  const formattedDate = dateObj
    ? dateObj.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    : "";

  const html = `
    <div class="leaflet-photo-popup">
      <div class="popup-desc">${photo.desc}</div>
      <img src="${photo.src}" style="width:100%;margin-top:6px;">
      <div class="popup-date">${formattedDate}</div>
    </div>
  `;

  L.popup({ maxWidth: 400 })
    .setLatLng([photo.coords[1], photo.coords[0]])
    .setContent(html)
    .openOn(map);
}

// ======================================================
// UTILITIES
// ======================================================
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function extractDateFromFilename(src) {
  const m = src.match(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m;
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}`);
}
