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
  attribution: 'Julien Houziaux | OSM'
});

const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
	attribution: 'Julien Houziaux | Google Satellite'
  }
);

const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
	attribution: 'Julien Houziaux | Google Maps'
  }
);

const map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  layers: [osm]
});

const hillshade = L.tileLayer(
  'https://services.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 13,
    attribution: 'Esri',
    opacity: 0.4
  }
);

const baseMaps = {
  "OpenStreetMap": osm,
  "Google Satellite": googleSat,
  "Google Street": googleStreets,
};

const osmb = new OSMBuildings(map)
  .load('https://{s}.data.osmbuildings.org/0.2/59fcc2e8/tile/{z}/{x}/{y}.json');

const osmbLayer = L.layerGroup();

const hillshadeLabel = `
  <span>Relief</span>
  <div style="margin-left:22px; margin-top:4px;">
    <input
      type="range"
      min="0"
      max="1"
      step="0.05"
      value="0.4"
      id="hillshadeOpacity"
    >
  </div>
`;

const groupedOverlays = {
  "hillshade": {
    [hillshadeLabel]: hillshade
  },
  "3D building": {
    "Bâtiments 3D": osmbLayer
  }};

L.control.groupedLayers(
  baseMaps,
  groupedOverlays,
  { collapsed: true }
).addTo(map);

map.on('layeradd', function () {
  const slider = document.getElementById('hillshadeOpacity');
  if (slider) {
    slider.addEventListener('input', function (e) {
      hillshade.setOpacity(e.target.value);
    });
  }
});
map.on('overlayadd', function (e) {
  if (e.layer === osmbLayer) {
    osmb.addTo(map);
  }
});

map.on('overlayremove', function (e) {
  if (e.layer === osmbLayer) {
    osmb.remove();
  }
});


map.whenReady(() => {
  setTimeout(() => {
    const slider = document.getElementById('hillshadeOpacity');
    if (!slider) return;

    // Empêche Leaflet de capter les events
    L.DomEvent.disableClickPropagation(slider);
    L.DomEvent.disableScrollPropagation(slider);

    slider.addEventListener('input', e => {
      hillshade.setOpacity(e.target.value);
    });
  }, 300);
});


// Affiche KM et Miles (imperial: true)
L.control.scale({ imperial: true, metric: true, position: 'bottomright' }).addTo(map);

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
	// --- AJOUTER CETTE LIGNE ICI ---
    legend.addTo(map); // La légende apparaît dès que les trajets sont chargés
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
// LEGENDE TRAJETS
// ======================================================
const legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const grades = ["avion", "train", "bus", "voiture", "bateau"];
  const colors = {
    avion: "#00dbc5",
    train: "#db0016",
    bus: "#dbc500",
    voiture: "#0016db",
    bateau: "#0084db"
  };
  const labels = [];

  div.innerHTML += '<strong>Transports</strong><br>';

  grades.forEach(mode => {
    div.innerHTML +=
      '<i style="background:' + colors[mode] + '"></i> ' +
      mode.charAt(0).toUpperCase() + mode.slice(1) + '<br>';
  });

  return div;
};

/*legend.addTo(map);*/





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
// TOGGLE CITY (AUTO-SORT & LAZY LOAD & HOTELS)
// ======================================================
function toggleCity(city) {
  const galleryDiv = document.getElementById(`gallery-${city.id}`);
  const wrapper = document.getElementById(`wrapper-${city.id}`);
  
  const isSameCity = (state.selectedCity && state.selectedCity.id === city.id);

  closeCities(); 

  if (isSameCity) return;

  state.selectedCity = city;

  // Masquer les points blancs des villes
  if (map.hasLayer(cityLayer)) map.removeLayer(cityLayer);
  map.closePopup();

  // 1. Préparation des données
  let allItems = [];
  if (city.flatPhotos) {
    allItems = city.flatPhotos.map(p => ({
      ...p,
      dateObj: p.src ? getDateFromFilename(p.src) : null // Les hotels n'ont pas forcément de src
    }));
  } else if (city.days) {
    allItems = city.days.flatMap(d => d.photos.map(p => ({...p, dateObj: new Date(d.date)})));
  }

  // 2. Séparer les Hôtels des Photos
  const hotels = allItems.filter(item => item.type === 'hotel');
  const photos = allItems.filter(item => item.type !== 'hotel');

// 3. Afficher les HOTELS (Point 2 : On les ajoute APRÈS ou avec un Z-index élevé)
hotels.forEach(h => {
    if(!h.coords) return;
    const hotelIcon = L.divIcon({
        className: 'custom-hotel-icon',
        html: '🏢',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    L.marker([h.coords[1], h.coords[0]], {
	   icon: hotelIcon,
       zIndexOffset: 1000 // Force l'affichage par-dessus les photos
	})
      .bindPopup(`<b>Hôtel</b><br>Du: ${h.datedeb || '?'}<br>Au: ${h.datefin || '?'}`)
      .addTo(photoLayer);

  });

  // 4. Afficher les PHOTOS (Version "Jolie" avec CSS)
  // On trie les photos chronologiquement
  photos.forEach(photo => {
      if (!photo.coords) return;
      const photoIcon = L.divIcon({
          className: 'photo-marker-icon', // On va changer le style dans le CSS
          iconSize: [12, 12], 
          iconAnchor: [5, 5]
      });
	  
  const marker = L.marker([photo.coords[1], photo.coords[0]], { 
          icon: photoIcon,
          zIndexOffset: 500 // En dessous des hôtels
      });
      
      marker.on("click", () => openPhotoPopup(photo));
      photoLayer.addLayer(marker);
  });

  // 5. Génération HTML (Galerie) - On n'affiche que les photos, pas les hotels
  const photosByDay = {};
  photos.forEach(photo => {
    if (!photo.dateObj) return; 
    const dateKey = photo.dateObj.toLocaleDateString("fr-FR", {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const dateKeyCap = dateKey.charAt(0).toUpperCase() + dateKey.slice(1);
    if (!photosByDay[dateKeyCap]) photosByDay[dateKeyCap] = [];
    photosByDay[dateKeyCap].push(photo);
  });

  const uniqueDates = [...new Set(photos.map(p => {
     if(!p.dateObj) return null;
     const d = p.dateObj.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
     return d.charAt(0).toUpperCase() + d.slice(1);
  }))].filter(d => d !== null);

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

  // Utiliser le zoom spécifique ou defaut (Point 2)
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
  photoLayer.clearLayers();
  state.selectedCity = null;
}


// ======================================================
// MAP HELPERS
// ======================================================
function zoomToTrip(trip) {
  map.fitBounds(trip.cities.map(c => [c.lat, c.lng]), { padding: [40, 40] });
}

function zoomOnCity(city) {
  // Utilise city.zoom s'il existe, sinon 12 par défaut
  const zoomLevel = city.zoom || 12;
  map.setView([city.lat, city.lng], zoomLevel);
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


// ======================================================
// GESTION ZOOM LABELS
// ======================================================
map.on('zoomend', function() {
  const currentZoom = map.getZoom();
  const mapDiv = document.getElementById('map');
  
  // Si le zoom est inférieur à 5 (trop haut), on cache les labels
  if (currentZoom < 5) {
    mapDiv.classList.add('map-zoomed-out');
  } else {
    mapDiv.classList.remove('map-zoomed-out');
  }
});

// Appel initial
if(map.getZoom() < 5) {
    document.getElementById('map').classList.add('map-zoomed-out');
}
