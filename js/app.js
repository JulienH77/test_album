// --------------------
// STATE
// --------------------
const state = {
  selectedTrip: null,
  selectedCity: null
};

// --------------------
// INIT MAP
// --------------------
const map = L.map("map").setView([20, 0], 2);
let photoLayer = L.layerGroup().addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let cityMarkers = [];

// --------------------
// DOM ELEMENTS
// --------------------
const tripListEl = document.getElementById("trip-list");
const contentEl = document.getElementById("content-section");

// --------------------
// RENDER TRIPS
// --------------------
travels.forEach(trip => {
  const li = document.createElement("li");
  li.textContent = trip.name;

  li.addEventListener("click", () => selectTrip(trip, li));
  tripListEl.appendChild(li);
});

// --------------------
// SELECT TRIP
// --------------------
function selectTrip(trip, li) {
  state.selectedTrip = trip;
  state.selectedCity = null;

  document
    .querySelectorAll("#trip-list li")
    .forEach(el => el.classList.remove("active"));
  li.classList.add("active");

  renderCities();
  updateMapForTrip();
}

// --------------------
// RENDER CITIES
// --------------------
function renderCities() {
  contentEl.innerHTML = "";

  state.selectedTrip.cities.forEach(city => {
    const cityDiv = document.createElement("div");
    cityDiv.className = "city";

    const header = document.createElement("div");
    header.className = "city-header";
    header.textContent = city.name;

    header.addEventListener("click", () =>
      toggleCity(city, cityDiv)
    );

    cityDiv.appendChild(header);
    contentEl.appendChild(cityDiv);
  });
}

// --------------------
// TOGGLE CITY
// --------------------
function toggleCity(city, cityDiv) {
  // Si on reclique sur la même ville → on ferme
  if (state.selectedCity?.id === city.id) {
    closeCities();
    photoLayer.clearLayers();
    return;
  }

  // On ferme toute ville ouverte avant
  closeCities();
  photoLayer.clearLayers();

  state.selectedCity = city;

  // 1️⃣ AFFICHAGE DES MARKERS PHOTO SUR LA CARTE
  showPhotoMarkers(city);

  // 2️⃣ CONSTRUCTION DE LA GALERIE SIDEBAR
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

      img.addEventListener("click", () => {
        openPhotoPopup(photo, city);
      });

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

  // 3️⃣ ZOOM SUR LA VILLE (optionnel mais logique)
  zoomOnCity(city);
}


// --------------------
// CLOSE ALL CITIES
// --------------------
function closeCities() {
  document.querySelectorAll(".city-gallery").forEach(el => el.remove());
  state.selectedCity = null;
  clearPhotoMarkers();
}

// --------------------
// MAP FUNCTIONS
// --------------------
function updateMapForTrip() {
  clearPhotoMarkers();
  cityMarkers.forEach(m => map.removeLayer(m));
  cityMarkers = [];

  const bounds = [];

  state.selectedTrip.cities.forEach(city => {
    const marker = L.marker([city.lat, city.lng]).addTo(map);
    cityMarkers.push(marker);
    bounds.push([city.lat, city.lng]);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
}

let photoMarkers = [];

function showPhotoMarkers(city) {
  photoLayer.clearLayers();

  city.days.forEach(day => {
    day.photos.forEach(photo => {
      if (!photo.coords) return;

      const marker = L.marker([photo.coords[1], photo.coords[0]]);
      marker.on("click", () => openPhotoPopup(photo, city));
      photoLayer.addLayer(marker);
    });
  });
}


function clearPhotoMarkers() {
  photoMarkers.forEach(m => map.removeLayer(m));
  photoMarkers = [];
}

function zoomOnCity(city) {
  map.setView([city.lat, city.lng], 10);
}

function openPhotoPopup(photo, city) {
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

  const popupContent = `
    <div class="leaflet-photo-popup">
      <div class="popup-desc">${photo.desc}</div>

      <div class="popup-img-wrapper">
        <img src="${photo.src}" />
        <button class="popup-fullscreen-btn" onclick="openFullscreen('${photo.src}')">⤢</button>
      </div>

      <div class="popup-date">${formattedDate}</div>
    </div>
  `;

  L.popup({ maxWidth: 400 })
	.setLatLng([photo.coords[1], photo.coords[0]])
    .setContent(popupContent)
    .openOn(map);
}


function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function extractDateFromFilename(src) {
  const match = src.match(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (!match) return null;

  const [, y, m, d, h, min, s] = match;
  return new Date(`${y}-${m}-${d}T${h}:${min}:${s}`);
}


function openFullscreen(src) {
  const overlay = document.getElementById("fullscreenOverlay");
  const img = document.getElementById("fullscreenImg");

  img.src = src;
  overlay.style.display = "flex";
}

function closeFullscreen() {
  document.getElementById("fullscreenOverlay").style.display = "none";
}

function trajetStyle(feature) {
  const colors = {
    avion: "#1e90ff",
    train: "#e63946",
    voiture: "#2a9d8f",
    bus: "#f4a261",
    bateau: "#6a4c93"
  };

  return {
    color: colors[feature.properties.trajet] || "#999",
    weight: 3,
    opacity: 0.8
  };
}
fetch("data/TRAJETS_ALL_vacances_wgs.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: trajetStyle,
      filter: feature => {
        return state.selectedTravel &&
               feature.properties.voyage === state.selectedTravel.name;
      }
    }).addTo(map);
  });
