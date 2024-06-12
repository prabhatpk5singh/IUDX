import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Feature, Point, GeoJsonObject } from 'geojson';
import { LatLngExpression } from 'leaflet';
import { CommonModule } from '@angular/common';

// Import Leaflet only if window is defined
let L: any;
if (typeof window !== 'undefined') {
  import('leaflet').then((leafletModule) => {
    L = leafletModule.default;

    // Update the default icon options
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });
  });
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  isMapViewOpen = false;
  activeTab: 'data' | 'visualise' = 'data';
  mapInitialized = false;

  geoJson: Feature<Point> = {
    type: 'Feature',
    properties: {
      REMARK: 'PLACES OF TOURIST IMPORTANCE',
      PLACE_NAME: 'GURUVAYUR'
    },
    geometry: {
      type: 'Point',
      coordinates: [76.0499014213516, 10.584114677881923]
    }
  };

  openMapView() {
    this.isMapViewOpen = true;
    // Reset the flag when opening the modal
    this.mapInitialized = false;
  }

  closeMapView() {
    this.isMapViewOpen = false;
  }

  setActiveTab(tab: 'data' | 'visualise') {
    this.activeTab = tab;
    // Initialize map only if visualise tab is active
    if (tab === 'visualise' && !this.mapInitialized) {
      this.initMap();
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isMapViewOpen && this.activeTab === 'visualise' && !this.mapInitialized) {
      // Check if Leaflet is loaded and the map container is available
      if (typeof L !== 'undefined' && document.getElementById('map')) {
        this.initMap();
        this.mapInitialized = true;
      }
    }
  }

  ngAfterViewChecked() {}

  initMap() {
    setTimeout(() => {
      // Check if Leaflet and map container are available
      if (typeof window !== 'undefined' && L && document.getElementById('map')) {
        const map = L.map('map').setView([10.584114677881923, 76.0499014213516], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          crossorigin: true // Add this line
        }).addTo(map);

        // Add GeoJSON layer to the map
        const geoJsonLayer = L.geoJSON(this.geoJson as GeoJsonObject, {
          onEachFeature: (feature: Feature<Point>, layer: L.Layer) => {
            if (feature.properties) {
              layer.bindPopup(Object.entries(feature.properties).map(([key, value]) => `${key}: ${value}`).join('<br>'));
            }
          }
        }).addTo(map);
        
        // Fit the map bounds to the GeoJSON layer
        map.fitBounds(geoJsonLayer.getBounds() as LatLngExpression[]);
        // Set mapInitialized flag to true
        this.mapInitialized = true;
      }
    }, 0);  // Use a timeout to ensure DOM is fully updated
  }
}
