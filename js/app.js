// ======================================================
// 1. STATE & VARIABLES GLOBALES
// ======================================================
const state = {
  selectedTrip: null,
  selectedCity: null,
  showExes: false
};

let trajetsGeoJSON = null; // Stockera les données brutes
let polylineDecoratorLayer = L.layerGroup(); // Pour les flèches

// ======================================================
// 2. INIT MAP & LAYERS
// ======================================================
// Fonds de carte
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Julien Houziaux | OSM'
});

const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: 'Julien Houziaux | Google Satellite'
});

const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: 'Julien Houziaux | Google Maps'
});

// Initialisation Carte
const map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  layers: [osm]
});

// Hillshade (Relief)
const hillshade = L.tileLayer(
  'https://services.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
  { maxZoom: 13, attribution: 'Esri', opacity: 0.4 }
);

// Bâtiments 3D
const osmb = new OSMBuildings(map).addTo(map);
const osmbLayer = L.layerGroup();
let osmbLoaded = false;

// Contrôle des couches (Layers Control)
const baseMaps = {
  "OpenStreetMap": osm,
  "Google Satellite": googleSat,
  "Google Street": googleStreets,
};

const hillshadeLabel = `<span>Relief</span><div style="margin-left:22px; margin-top:4px;"><input type="range" min="0" max="1" step="0.05" value="0.4" id="hillshadeOpacity"></div>`;

const groupedOverlays = {
  "hillshade": { [hillshadeLabel]: hillshade },
  "3D building": { "Bâtiments 3D": osmbLayer }
};

L.control.groupedLayers(baseMaps, groupedOverlays, { collapsed: true }).addTo(map);

// Echelle
L.control.scale({ imperial: true, metric: true, position: 'bottomright' }).addTo(map);

// Groupes de calques (Z-Index implicite par ordre d'ajout)
const trajetLayer = L.layerGroup().addTo(map);
polylineDecoratorLayer.addTo(map); // Flèches par dessus les lignes
const cityLayer   = L.layerGroup().addTo(map);
const photoLayer  = L.layerGroup().addTo(map);

// ======================================================
// 3. LOGIQUE RELIEF & 3D (Events)
// ======================================================
map.on('layeradd', function () {
  const slider = document.getElementById('hillshadeOpacity');
  if (slider) {
    slider.addEventListener('input', function (e) {
      hillshade.setOpacity(e.target.value);
    });
  }
});

map.on('overlayadd', function (e) {
  if (e.layer === osmbLayer && !osmbLoaded) {
    osmb.load('https://{s}.data.osmbuildings.org/0.2/59fcc2e8/tile/{z}/{x}/{y}.json');
    osmbLoaded = true;
  }
});

map.on('overlayremove', function (e) {
  if (e.layer === osmbLayer) {
    osmb.remove();
    osmbLoaded = false;
  }
});

map.whenReady(() => {
  setTimeout(() => {
    const slider = document.getElementById('hillshadeOpacity');
    if (!slider) return;
    L.DomEvent.disableClickPropagation(slider);
    L.DomEvent.disableScrollPropagation(slider);
    slider.addEventListener('input', e => hillshade.setOpacity(e.target.value));
  }, 300);
});

// ======================================================
// 4. LEGENDE (Définition avant usage)
// ======================================================
const legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const grades = ["avion", "train", "bus", "voiture", "bateau"];
  const colors = {
    avion: "#00dbc5", train: "#db0016", bus: "#dbc500", voiture: "#0016db", bateau: "#0084db"
  };
  div.innerHTML += '<strong>Transports</strong><br>';
  grades.forEach(mode => {
    // Style "ligne" défini dans le CSS
    div.innerHTML += `<i style="background:${colors[mode]}"></i> ${mode.charAt(0).toUpperCase() + mode.slice(1)}<br>`;
  });
  return div;
};

// ======================================================
// 5. CHARGEMENT DONNÉES (GeoJSON)
// ======================================================
fetch("data/GEOJSON/TRAJETS_ALL_vacances_wgs.geojson")
  .then(r => {
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  })
  .then(data => {
    trajetsGeoJSON = data; // On stocke juste les données, on n'affiche rien au démarrage
    console.log("GeoJSON chargé avec succès.");
    // La légende est ajoutée ici pour être prête, mais on pourrait aussi l'ajouter dans loadTrip
    legend.addTo(map); 
  })
  .catch(err => console.error("Erreur chargement trajets :", err));


// ======================================================
// 6. FONCTIONS D'AFFICHAGE TRAJET (Style, Popup, Flèches)
// ======================================================

function trajetStyle(feature) {
  const colors = {
    avion: "#00dbc5", train: "#db0016", bus: "#dbc500", voiture: "#0016db", bateau: "#0084db"
  };
  return {
    color: colors[feature.properties.trajet] || "#666",
    weight: 4, // Un peu plus épais pour voir les flèches
    opacity: 0.8
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
onEachFeature: function (feature, layer) {
  const p = feature.properties;

  const html = `
    <div class="trajet-popup">
      <div class="trajet-header ${p.trajet}">
        ${p.trajet.toUpperCase()}
      </div>

      <div class="trajet-body">
        <div class="trajet-line">
          <span>Départ</span>
          <span>${formatDateTime(p.date_deb)}</span>
        </div>
        <div class="trajet-line">
          <span>Arrivée</span>
          <span>${formatDateTime(p.date_fin)}</span>
        </div>

        <div class="trajet-separator"></div>

        <div class="trajet-metrics">
          <div>
            <span class="label">Durée</span>
            <span class="value">${p.duree}</span>
          </div>
          <div>
            <span class="label">Distance</span>
            <span class="value">${p.distanceKM} km</span>
          </div>
        </div>

        <div class="trajet-voyage">${p.voyage}</div>
      </div>
    </div>
  `;

  layer.bindPopup(html, {
    maxWidth: 320,
    className: "trajet-popup-wrapper"
  });
}
  });

  // On ajoute le geojson au groupe trajetLayer
  trajetLayer.addLayer(geojsonLayer);
}

// ======================================================
// 7. GESTION DU MENU DÉROULANT & CHARGEMENT VOYAGE
// ======================================================

// C'est la fonction qui manquait pour faire le lien !
function loadTrip(tripId) {
    // 1. Trouver le voyage dans la liste travels.js
    const trip = travels.find(t => t.id === tripId);
    if (!trip) return;

    // 2. Mise à jour du state
    state.selectedTrip = trip;
    state.selectedCity = null;

    // 3. Reset interface
    closeCities(); // Ferme les détails d'avant
    
    // 4. Afficher Trajets + Villes + Sidebar
    showTrajetsForTrip(trip);
    showCities(trip);
    renderCities();
    zoomToTrip(trip);
}

function initTripList() {
  const container = document.getElementById('custom-options-container');
  const trigger = document.querySelector('.custom-select-trigger');
  const wrapper = document.querySelector('.custom-select');
  const label = document.getElementById('selected-trip-label');

  if (!container || !trigger) return; 

  travels.forEach(trip => {
    const option = document.createElement('div');
    option.className = 'custom-option';
    option.textContent = trip.name; 
    option.dataset.value = trip.id;
    
    option.addEventListener('click', () => {
        label.textContent = trip.name;
        document.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        wrapper.classList.remove('open');
        
        // APPEL DE LA FONCTION DE CHARGEMENT
        loadTrip(trip.id);
    });

    container.appendChild(option);
  });

  trigger.addEventListener('click', () => wrapper.classList.toggle('open'));
  document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) wrapper.classList.remove('open');
  });
}

// ======================================================
// 8. LOGIQUE VILLES & PHOTOS
// ======================================================

function showCities(trip) {
  cityLayer.clearLayers();
  trip.cities.forEach(city => {
    // Point blanc
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 6, fillColor: "#fff", fillOpacity: 1, color: "#000", weight: 2
    });

    // Label texte
    const label = L.marker([city.lat, city.lng], {
      icon: L.divIcon({
        className: "city-label",
        html: `<span>${city.name}</span>`,
        iconSize: [120, 24], iconAnchor: [60, 36]
      }),
      interactive: false
    });

    marker.on("click", () => {
       // Scroll automatique vers la ville dans la sidebar
       toggleCity(city);
    });

    cityLayer.addLayer(marker);
    cityLayer.addLayer(label);
  });
}

function renderCities() {
  const contentEl = document.getElementById("content-section");
  contentEl.innerHTML = "";

  state.selectedTrip.cities.forEach(city => {
    const cityWrapper = document.createElement("div");
    cityWrapper.className = "city-wrapper";
    cityWrapper.id = `wrapper-${city.id}`;

    const cityCard = document.createElement("div");
    cityCard.className = "city-card";
    // Assurez-vous que les images existent dans ce dossier
    const imgPath = `data/IMG/VillesVisitees/${city.id}.jpg`;
    cityCard.style.backgroundImage = `url('${imgPath}')`;

    cityCard.innerHTML = `<div class="city-overlay"></div><span class="city-name">${city.name}</span>`;

    const galleryContainer = document.createElement("div");
    galleryContainer.className = "city-gallery-container";
    galleryContainer.id = `gallery-${city.id}`;

    cityCard.addEventListener("click", () => toggleCity(city));

    cityWrapper.appendChild(cityCard);
    cityWrapper.appendChild(galleryContainer);
    contentEl.appendChild(cityWrapper);
  });
}

function toggleCity(city) {
  const galleryDiv = document.getElementById(`gallery-${city.id}`);
  const wrapper = document.getElementById(`wrapper-${city.id}`);
  
  const isSameCity = (state.selectedCity && state.selectedCity.id === city.id);

  closeCities(); // Ferme tout

  if (isSameCity) return; // Si c'est la même, on a juste fermé, on arrête

  state.selectedCity = city;

  // Masquer les points blancs des villes pour éviter la superposition
  if (map.hasLayer(cityLayer)) map.removeLayer(cityLayer);
  map.closePopup();

  // 1. Préparation des données
  let allItems = [];
  if (city.flatPhotos) {
    allItems = city.flatPhotos.map(p => ({
      ...p,
      dateObj: getDateFromFilename(p.src) 
    }));
  } else if (city.days) {
    allItems = city.days.flatMap(d => d.photos.map(p => ({...p, dateObj: new Date(d.date)})));
  }

  // 2. Séparer Hôtels / Photos
  const hotels = allItems.filter(item => item.type === 'hotel');
  /*const photos = allItems.filter(item => item.type !== 'hotel');*/
  // NOUVELLE LIGNE : On filtre les photos qui ne sont pas des hôtels ET 
  // (qui n'ont pas le tag withEx OU ALORS le mode showExes est activé)
  const photos = allItems.filter(item => item.type !== 'hotel' && (!item.withEx || state.showExes));

  // 3. Afficher les HOTELS (Z-Index élevé)
  hotels.forEach(h => {
    if(!h.coords) return;
    const hotelIcon = L.divIcon({
        className: 'custom-hotel-icon',
        html: '🏢',
        iconSize: [24, 24], iconAnchor: [12, 12]
    });
    
    L.marker([h.coords[1], h.coords[0]], {
       icon: hotelIcon,
       zIndexOffset: 1000 // Au-dessus
    })
      .bindPopup(`<b>Hôtel</b><br>Du: ${h.datedeb || '?'}<br>Au: ${h.datefin || '?'}`)
      .addTo(photoLayer);
  });

  // 4. Afficher les PHOTOS
  photos.forEach(photo => {
      if (!photo.coords) return;
      const photoIcon = L.divIcon({
          className: 'photo-marker-icon', // Style CSS bleu
          iconSize: [10, 10], 
          iconAnchor: [5, 5]
      });
      
      const marker = L.marker([photo.coords[1], photo.coords[0]], { 
          icon: photoIcon,
          zIndexOffset: 500 // En dessous
      });
      
      if (photo.withEx && !state.showExes) {
		  marker.bindPopup("<b>Contenu privé 🔒</b><br>Coche la case pour voir.");
		} else {
		  marker.on("click", () => openPhotoPopup(photo));
		}
      photoLayer.addLayer(marker);
  });

  // 5. Génération HTML Galerie
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
      ${photosByDay[dateStr].map(photo => {
        const isBlurred = photo.withEx && !state.showExes;
        const blurClass = isBlurred ? 'photo-blurred' : '';
        const clickAction = isBlurred 
          ? '' 
          : `onclick='openPhotoPopup(${JSON.stringify(photo).replace(/'/g, "&#39;")})'`;

        return `
          <div class="photo-item img-wrapper">
            <img 
              src="${photo.src}" 
              class="${blurClass}"
              loading="lazy"
              ${clickAction}
              style="cursor:${isBlurred ? 'default' : 'pointer'}"
            >
            ${photo.desc ? `<div class="photo-desc">${photo.desc}</div>` : ''}
          </div>
        `;
      }).join('')}
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
// 9. UTILITAIRES & CLOSE
// ======================================================

function getDateFromFilename(src) {
  if (!src) return new Date();
  const match = src.match(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (match) {
    return new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
  }
  return new Date(); 
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function closeCities() {
  document.querySelectorAll(".city-gallery-container").forEach(el => {
    el.classList.remove("active");
    el.innerHTML = "";
  });
  photoLayer.clearLayers(); 
  map.closePopup();         
  if (state.selectedTrip) {
    if (!map.hasLayer(cityLayer)) map.addLayer(cityLayer);
  }
}

function zoomToTrip(trip) {
  if(trip.cities && trip.cities.length > 0) {
     map.fitBounds(trip.cities.map(c => [c.lat, c.lng]), { padding: [50, 50] });
  }
}

function zoomOnCity(city) {
  const zoomLevel = city.zoom || 12;
  map.setView([city.lat, city.lng], zoomLevel);
}

// ======================================================
// 10. PHOTO POPUP (FULLSCREEN)
// ======================================================
function openPhotoPopup(photo) {
  const d = getDateFromFilename(photo.src);
  const dateStr = d ? d.toLocaleString("fr-FR") : "";

  const html = `
    <div class="leaflet-photo-popup">
      <div class="popup-desc">${photo.desc || ""}</div>
      <div class="popup-img-wrapper">
        <img src="${photo.src}">
        <button class="popup-fullscreen-btn" onclick="openFullscreen('${photo.src}')">⤢</button>
      </div>
      <div class="popup-date">${dateStr}</div>
    </div>
  `;

  L.popup({ maxWidth: 550, minWidth: 300, className: 'custom-popup' })
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
// 11. GESTION ZOOM LABELS
// ======================================================
map.on('zoomend', function() {
  const currentZoom = map.getZoom();
  const mapDiv = document.getElementById('map');
  if (currentZoom < 5) {
    mapDiv.classList.add('map-zoomed-out');
  } else {
    mapDiv.classList.remove('map-zoomed-out');
  }
});
if(map.getZoom() < 5) {
    document.getElementById('map').classList.add('map-zoomed-out');
}




/*
// ======================================================
// EASTER EGG : TOGGLE PHOTOS EX
// ======================================================
let secretClickCount = 0;
let secretClickTimer;

// On cible le titre "Voyages" de la barre latérale
const titleElement = document.querySelector('#trip-section h2');
if (titleElement) {
  titleElement.style.cursor = "default"; // Pour ne pas éveiller les soupçons avec un curseur cliquable
  
  titleElement.addEventListener('click', () => {
    secretClickCount++;
    clearTimeout(secretClickTimer);
    
    // Réinitialise le compteur après 1 seconde
    secretClickTimer = setTimeout(() => {
      secretClickCount = 0;
    }, 1000);

    // Au bout de 3 clics rapides
    if (secretClickCount === 3) {
      state.showExes = !state.showExes; // On inverse l'état
      secretClickCount = 0; // On reset le compteur
      
      // Petit feedback discret pour confirmer (tu peux l'enlever plus tard si tu veux que ce soit 100% invisible)
      alert(state.showExes ? "Mode souvenirs complet activé 🔓" : "Mode souvenirs filtré activé 🔒");
      
      // Si une ville est actuellement ouverte, on la recharge automatiquement pour appliquer le filtre
      if (state.selectedCity) {
        const currentCity = state.selectedCity;
        state.selectedCity = null; // Astuce pour forcer la fonction toggleCity à recharger la ville
        toggleCity(currentCity);
      }
    }
  });
}*/




const toggleExCheckbox = document.getElementById('toggle-ex');

if (toggleExCheckbox) {
  toggleExCheckbox.addEventListener('change', (e) => {
    state.showExes = e.target.checked;

    // Recharge la ville ouverte pour appliquer le flou
    if (state.selectedCity) {
      const currentCity = state.selectedCity;
      state.selectedCity = null;
      toggleCity(currentCity);
    }
  });
}


// ======================================================
// 12. INITIALISATION FINALE
// ======================================================
initTripList();
