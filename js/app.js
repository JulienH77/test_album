// ======================================================
// STATE
// ======================================================
const state = {
  selectedTrip: null,
  selectedCity: null
};

// ======================================================
// INIT MAP & LAYERS
// ======================================================
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
});

const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: "© Google Maps"
});

const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: "© Google Maps"
});

const map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  layers: [osm] // Fond par défaut
});

const baseMaps = {
  "OpenStreetMap": osm,
  "Google Satellite": googleSat,
  "Google Street": googleStreets
};

L.control.layers(baseMaps).addTo(map);
L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);

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
  // 1. On vide le groupe de calques existant (trajetLayer est défini en haut de votre fichier)
  trajetLayer.clearLayers();

  if (!trajetsGeoJSON) {
    console.error("Les données GeoJSON ne sont pas encore chargées.");
    return;
  }

  // 2. FILTRE : On compare l'ID du voyage (ou le name selon votre GeoJSON)
  // Vérifiez si votre GeoJSON utilise l'ID (2025_china) ou le nom (May 2025 - China)
  const trajetsFiltres = trajetsGeoJSON.features.filter(
    feature => feature.properties.voyage === trip.id || feature.properties.voyage === trip.name
  );

  console.log("Trajets trouvés pour " + trip.name + " :", trajetsFiltres.length);

  // 3. AJOUT À LA CARTE
  const geojsonLayer = L.geoJSON(trajetsFiltres, {
    style: function(feature) {
      // On passe l'objet feature complet ici
      return trajetStyle(feature);
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
        <b>Voyage</b>: ${feature.properties.voyage}<br>
        <b>Mode</b>: ${feature.properties.trajet}<br>
        <b>Distance</b>: ${feature.properties.distanceKM || '?'} km
      `);
    }
  });

  // On ajoute le geojson au groupe trajetLayer
  trajetLayer.addLayer(geojsonLayer);
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
// RENDER CITIES SIDEBAR (Version Accordéon)
// ======================================================
function renderCities() {
  contentEl.innerHTML = "";

  state.selectedTrip.cities.forEach(city => {
    // Conteneur global de la ville (Card + Galerie)
    const cityWrapper = document.createElement("div");
    cityWrapper.className = "city-wrapper";
    cityWrapper.id = `wrapper-${city.id}`;

    // La carte visuelle
    const cityCard = document.createElement("div");
    cityCard.className = "city-card";
    const imgPath = `data/IMG/VillesVisitees/${city.id}.jpg`;
    cityCard.style.backgroundImage = `url('${imgPath}')`;

    cityCard.innerHTML = `
      <div class="city-overlay"></div>
      <span class="city-name">${city.name}</span>
    `;

    // Zone où la galerie apparaîtra
    const galleryContainer = document.createElement("div");
    galleryContainer.className = "city-gallery-container";
    galleryContainer.id = `gallery-${city.id}`;

    cityCard.addEventListener("click", () => toggleCity(city));

    cityWrapper.appendChild(cityCard);
    cityWrapper.appendChild(galleryContainer);
    contentEl.appendChild(cityWrapper);
  });
}

// ======================================================
// TOGGLE CITY (Avec repli et défilement)
// ======================================================
function toggleCity(city) {
  const wrapper = document.getElementById(`wrapper-${city.id}`);
  const galleryDiv = document.getElementById(`gallery-${city.id}`);
  
  // Si on clique sur la ville déjà ouverte : on replie tout et on arrête
  if (state.selectedCity?.id === city.id) {
    closeCities();
    showCities(state.selectedTrip);
    return;
  }

  // 1. Fermer les autres galeries
  closeCities();
  state.selectedCity = city;

  // 2. Mise à jour visuelle de la carte (Marqueurs rouges)
  cityLayer.clearLayers();
  photoLayer.clearLayers();

  city.days.forEach(day => {
    day.photos.forEach(photo => {
      if (!photo.coords) return;
      const marker = L.circleMarker([photo.coords[1], photo.coords[0]], {
        radius: 6,
        fillColor: "#ff0000", // Rouge
        fillOpacity: 1,
        color: "#000000",      // Contour noir
        weight: 2
      });
      marker.on("click", () => openPhotoPopup(photo));
      photoLayer.addLayer(marker);
    });
  });

  // 3. Remplissage et ouverture de la galerie
  const galleryHTML = city.days.map(day => `
    <div class="day-block">
      <div class="day-title">${formatDate(day.date)}</div>
      <div class="photo-grid">
        ${day.photos.map(photo => `
          <div class="photo-item">
            <img src="${photo.src}" onclick='openPhotoPopup(${JSON.stringify(photo)})'>
            <div class="photo-desc">${photo.desc || ""}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  galleryDiv.innerHTML = galleryHTML;
  galleryDiv.classList.add("active");

  // 4. Remonter la ville en haut de la sidebar
  setTimeout(() => {
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300); // Petit délai pour laisser l'animation de dépliage commencer

  zoomOnCity(city);
}

function closeCities() {
  document.querySelectorAll(".city-gallery-container").forEach(el => {
    el.classList.remove("active");
    el.innerHTML = "";
  });
  state.selectedCity = null;
  photoLayer.clearLayers();
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
