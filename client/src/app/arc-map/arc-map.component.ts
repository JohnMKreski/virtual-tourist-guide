import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import { ComponentLibraryModule } from '@arcgis/map-components-angular';
// import { loadModules } from 'esri-loader';
import esriConfig from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';

@Component({
  selector: 'app-arc-map',
  standalone: true,
  imports: [ComponentLibraryModule],
  templateUrl: './arc-map.component.html',
  styleUrl: './arc-map.component.scss'
})
export class ArcMapComponent implements OnInit {

  constructor() {}

  title = "map-components-angular-template";

  ngOnInit(): void {
    // defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets" });
    this.initializeMap();
  }

  private initializeMap(): void {
    const webMap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: '604562cb499d4e1984b1aed11d961bec' // Replace with your WebMap ID
      }
    });

    const view = new MapView({
      container: 'viewDiv', // Reference to the map container
      map: webMap,
      center: [-118, 34], // Longitude, latitude
      zoom: 8 // Zoom level
    });
  }
}


//   initializeMap(): void {
//     esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurAJzDcUF0BFV6XdvdgxuWkmi8TAgDEXbPd_p9Q6zfjUPuOaCBJqv3l5fHDLjaf0CLsRR8RBiF8SIbEA37wKYLToD1v9K64m4Cft9WFrA8JTUhz1c5yLoSRSPJjGv-BgexiVsv8TZbXjX-171HeUCTL3SnGE9prfHkF_YpY5FY6YjESDUPNoQwtdCaAg1CBLVUTGOMo_huwt_O-3zMyjMpooAuLN8gjLyuZkEapNIzedmAT1_yI8eF1J6";

//     const map = new Map({
//       basemap: "arcgis-topographic" // Correct basemap reference
//     });

//     const view = new MapView({
//       container: 'viewDiv', // This should be the id of a div in your arc-map.component.html
//       map: map,
//       center: [-118.805, 34.027], // Longitude, latitude
//       zoom: 13
//     });

//     view.when(() => {
//       console.log("MapView is ready");
//       // Additional logic can go here if needed
//     }, err => {
//       console.error("Error in setting up the MapView", err);
//     });
//   }

//   arcgisViewReadyChange(event: any): void {
//     console.log("MapView ready", event);
//   }
// }


