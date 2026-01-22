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
  closeCities();
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
// TOGGLE CITY (AUTO-SORT & LAZY LOAD)
// ======================================================
function toggleCity(city) {
  const galleryDiv = document.getElementById(`gallery-${city.id}`);
  const wrapper = document.getElementById(`wrapper-${city.id}`);
  
  // Si c'est déjà la ville active, on ne fait rien (car closeCities a déjà tout fermé juste avant si besoin)
  // Note : j'ai simplifié la logique d'ouverture/fermeture pour être plus robuste
  const isSameCity = (state.selectedCity && state.selectedCity.id === city.id);

  closeCities(); 

  if (isSameCity) return;

  state.selectedCity = city;

  // Masquer les points blancs
  if (map.hasLayer(cityLayer)) map.removeLayer(cityLayer);
  map.closePopup();

  // ------------------------------------------------------
  // LE COEUR DU SYSTÈME : TRAITEMENT AUTOMATIQUE
  // ------------------------------------------------------
  
  // 1. On récupère la liste brute et on la transforme
  // Si tu as gardé "days" dans d'autres voyages, on gère les deux cas (rétro-compatibilité)
  let allPhotos = [];
  
  if (city.flatPhotos) {
    // NOUVELLE MÉTHODE : Liste en vrac
    allPhotos = city.flatPhotos.map(p => ({
      ...p,
      dateObj: getDateFromFilename(p.src) // On calcule la date auto depuis le nom de fichier
    }));
  } else if (city.days) {
    // ANCIENNE MÉTHODE (au cas où)
    allPhotos = city.days.flatMap(d => d.photos.map(p => ({...p, dateObj: new Date(d.date)})));
  }

  // 2. On trie chronologiquement (du plus vieux au plus récent)
  allPhotos.sort((a, b) => a.dateObj - b.dateObj);

  // 3. On affiche les markers (Points Rouges)
  allPhotos.forEach(photo => {
    if (!photo.coords) return;
    const marker = L.circleMarker([photo.coords[1], photo.coords[0]], {
      radius: 7, fillColor: "#ff0000", fillOpacity: 1, color: "#000", weight: 2
    });
    marker.on("click", () => openPhotoPopup(photo));
    photoLayer.addLayer(marker);
  });

  // 4. On regroupe par JOUR (Grouping)
  const photosByDay = {};
  allPhotos.forEach(photo => {
    // Clé de date lisible : "Lundi 19 mai 2025"
    if (!photo.dateObj) return; // Sécurité si nom de fichier invalide
    const dateKey = photo.dateObj.toLocaleDateString("fr-FR", {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    // On met la 1ere lettre en majuscule
    const dateKeyCap = dateKey.charAt(0).toUpperCase() + dateKey.slice(1);

    if (!photosByDay[dateKeyCap]) photosByDay[dateKeyCap] = [];
    photosByDay[dateKeyCap].push(photo);
  });

  // 5. Génération HTML avec LAZY LOADING
  // Object.keys ne garantit pas l'ordre, mais comme on a trié allPhotos avant, 
  // on va itérer sur les groupes dans l'ordre chronologique.
  
  // On récupère les clés uniques (les dates) dans l'ordre d'apparition des photos triées
  const uniqueDates = [...new Set(allPhotos.map(p => {
     const d = p.dateObj.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
     return d.charAt(0).toUpperCase() + d.slice(1);
  }))];

  const galleryHTML = uniqueDates.map(dateStr => `
    <div class="day-block">
      <div class="day-title">${dateStr}</div>
      <div class="photo-grid-2-cols">
        ${photosByDay[dateStr].map(photo => `
          <div class="photo-item">
            <img 
              src="${photo.src}" 
              loading="lazy" 
              onclick='openPhotoPopup(${JSON.stringify(photo).replace(/'/g, "&#39;")})'
            >
            ${photo.desc ? `<div class="photo-desc">${photo.desc}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  galleryDiv.innerHTML = galleryHTML;
  
  setTimeout(() => {
    galleryDiv.classList.add("active");
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);

  zoomOnCity(city);
}

// ======================================================
// UTILITAIRE : Extraction Date depuis Filename
// ======================================================
function getDateFromFilename(src) {
  // Cherche le motif IMG_YYYYMMDD_HHMMSS
  // Exemple: IMG_20250519_221420.jpg
  const match = src.match(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  
  if (match) {
    // new Date(Year, MonthIndex (0-11), Day, Hour, Min, Sec)
    return new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
  }
  
  // Fallback : Si le nom ne correspond pas, on renvoie une date par défaut (ou null)
  return new Date(); 
}

// ======================================================
// CLOSE CITIES (Réinitialisation)
// ======================================================
function closeCities() {
  // 1. Fermer les galeries sidebar
  document.querySelectorAll(".city-gallery-container").forEach(el => {
    el.classList.remove("active");
    el.innerHTML = "";
  });

  // 2. Nettoyer la carte
  photoLayer.clearLayers(); // Enlève les points rouges
  map.closePopup();         // Ferme les popups photos

  // 3. Ré-afficher les points blancs des villes (si un voyage est sélectionné)
  if (state.selectedTrip) {
    if (!map.hasLayer(cityLayer)) {
      map.addLayer(cityLayer);
    }
  }

  state.selectedCity = null;
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

  L.popup({ 
    maxWidth: 550,
    minWidth: 300,
    className: 'custom-popup'
  })
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
