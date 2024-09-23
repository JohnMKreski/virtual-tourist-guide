import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { environment } from '../../environments/environment';

import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import { ComponentLibraryModule } from '@arcgis/map-components-angular';
import  esriConfig from "@arcgis/core/config";

import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import View from'@arcgis/core/views/View';


@Component({
  selector: 'app-arc-map',
  standalone: true,
  imports: [],
  templateUrl: './arc-map.component.html',
  styleUrl: './arc-map.component.scss'
})
export class ArcMapComponent implements OnInit, OnDestroy {

  public view: any = null; //new

  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef; // Reference to map container

  title = "map-components-angular-template";

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    const webmap = new WebMap({
      portalItem: {
        id: '604562cb499d4e1984b1aed11d961bec',
      },
    });

    this.view = new MapView({
      container,
      map: webmap
    });

    const bookmarks = new Bookmarks({
      view: this.view
    });

    const bkExpand = new Expand({
      view: this.view,
      content: bookmarks,
      expanded: true,
    });

    // Add the widget to the top-right corner of the view
    this.view.ui.add(bkExpand, 'top-right');

    // bonus - how many bookmarks in the webmap?
    this.view.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });

    return this.view.when();
  }

  ngOnInit(): any {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
      console.log('The map is ready.');
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}










//   constructor() {
//     // Log when the constructor is invoked
//     console.log("ArcMapComponent constructor called");  
//   }

//   arcgisViewReadyChange(event: any) {
//     // Log when the view is ready
//     console.log("MapView ready", event);
//   }

//   ngOnInit(): void {
//     // Log when ngOnInit lifecycle hook is called
//     console.log("ngOnInit called: component initialization");

//     // Conditionally check if ResizeObserver is available
//     // if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
//     //   const resizeObserver = new ResizeObserver((entries) => {
//     //     for (let entry of entries) {
//     //       console.log('Resized:', entry);
          
//     //          // Optional: If you want to trigger something when the map container resizes
//     //         const width = entry.contentRect.width;
//     //         const height = entry.contentRect.height;

//     //         console.log(`New width: ${width}, new height: ${height}`);

//     //         // If necessary, you can adjust the map or other elements here
//     //         // view.resize(); // Adjust the map view if needed
//     //     }
//     //   });

//     //   resizeObserver.observe(this.mapViewDiv.nativeElement);

//     // } else {
//     //   console.warn("ResizeObserver is not available. This may happen in SSR or non-browser environments.");
//     // }

//     esriConfig.apiKey = environment.arcgisApiKey;
    
//     // Check if the API key is missing
//     if (!environment.arcgisApiKey) {
//       console.error("No ArcGIS API key found. Please define NG_APP_ARCGIS_API_KEY in your environment file.");
//       // Optionally: Display an error message or alert to the user
//       alert("ArcGIS API key is missing.");
//       return;
//     }

//     // Check if running in the browser
//     if (typeof window !== 'undefined') {
//       defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets" });
//     } else {
//       console.warn("Not running in a browser environment, skipping defineCustomElements.");
//     }

//     // const webmap = new WebMap({
//     //   portalItem: {
//     //     id: environment.arcgisWebMapId,  // Your Web Map ID
//     //   },
//     // });

//     // const map = new Map({
//     //   basemap: "topo-vector",
//     // });

//     // const mapView = new View({
//     //   map: map,
//     //   container: "viewDiv"
//     // });

//     // const view = new MapView({
//     //   container: "mapViewDiv",  // ID of the container in your HTML
//     //   map: webmap,
//     //   constraints: {
//     //     // Set constraints to prevent zooming or panning too far
//     //     minZoom: 3,
//     //     maxZoom: 20,
//     //     snapToZoom: true,
        
//     //   },
//     // });

//     // view.when(() => {
//     //   console.log("MapView is ready");

//     //   // const resizeObserver = new ResizeObserver(() => {
//     //   //   // view.resize([32, 32]); // Adjust the map view on resize
//     //   //   // view.zoom = view.zoom; // Reset zoom if necessary to handle resize issues
//     //   // });
    
//     //   // resizeObserver.observe(this.mapViewDiv.nativeElement);
//     // }).catch(err => {
//     //   console.error("Error loading MapView: ", err);
//     // });
//   }

//    // Other lifecycle hooks for debugging
//   ngAfterViewInit(): void {
//     // Log when the view is fully initialized
//     console.log("ngAfterViewInit: View initialization is complete");  
//   }

//   ngOnDestroy(): void {
//     // Log when the component is destroyed
//     console.log("ngOnDestroy: Component is being destroyed");  
//   }

// }