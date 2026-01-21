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
const trajetLayer = L.layerGroup().addTo(map);
const cityLayer   = L.layerGroup().addTo(map);
const photoLayer  = L.layerGroup().addTo(map);

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
  }).addTo(trajetLayer);
}

// ======================================================
// SHOW CITIES (points + labels)
// ======================================================
function showCities(trip) {
  cityLayer.clearLayers();

  trip.cities.forEach(city => {
    // point
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 7,
      fillColor: "#fff",
      fillOpacity: 1,
      color: "#000",
      weight: 3
    });

    // label
    const label = L.marker([city.lat, city.lng], {
      icon: L.divIcon({
        className: "city-label",
        html: `<span>${city.name}</span>`,
        iconSize: [120, 24],
        iconAnchor: [60, 36]
      }),
      interactive: false
    });

    marker.on("click", () => {
      const cityDiv = document.querySelector(`[data-city="${city.id}"]`);
      toggleCity(city, cityDiv);
    });

    cityLayer.addLayer(marker);
    cityLayer.addLayer(label);
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
  photoLayer.clearLayers();

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
    showCities(state.selectedTrip);
    return;
  }

  closeCities();
  state.selectedCity = city;

  // 🔴 enlever les points des villes
  cityLayer.clearLayers();
  photoLayer.clearLayers();

  // 🟢 afficher les photos sur la carte
  city.days.forEach(day => {
    day.photos.forEach(photo => {
      if (!photo.coords) return;

      const marker = L.circleMarker(
        [photo.coords[1], photo.coords[0]],
        {
          radius: 6,
          fillColor: "#ffcc00",
          fillOpacity: 1,
          color: "#000",
          weight: 2
        }
      );

      marker.on("click", () => openPhotoPopup(photo));
      photoLayer.addLayer(marker);
    });
  });

  // galerie sidebar
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
  photoLayer.clearLayers();
}

// ======================================================
// MAP HELPERS
// ======================================================
function zoomToTrip(trip) {
  map.fitBounds(trip.cities.map(c => [c.lat, c.lng]), { padding: [40, 40] });
}

function zoomOnCity(city) {
  map.setView([city.lat, city.lng], 12);
}

// ======================================================
// PHOTO POPUP + FULLSCREEN
// ======================================================
function openPhotoPopup(photo) {
  const d = extractDateFromFilename(photo.src);
  const dateStr = d ? d.toLocaleString("fr-FR") : "";

  const html = `
    <div class="leaflet-photo-popup">
      <div class="popup-desc">${photo.desc || ""}</div>
      <div class="popup-img-wrapper">
        <img src="${photo.src}">
        <button class="popup-fullscreen-btn"
          onclick="openFullscreen('${photo.src}')">⤢</button>
      </div>
      <div class="popup-date">${dateStr}</div>
    </div>
  `;

  L.popup({ maxWidth: 420 })
    .setLatLng([photo.coords[1], photo.coords[0]])
    .setContent(html)
    .openOn(map);
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
  return new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`);
}
