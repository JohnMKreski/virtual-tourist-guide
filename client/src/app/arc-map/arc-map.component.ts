import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { environment } from '../../environments/environment';

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-legend";

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
  imports: [ComponentLibraryModule],
  templateUrl: './arc-map.component.html',
  styleUrl: './arc-map.component.scss'
})
export class ArcMapComponent implements OnInit, OnDestroy {

  title = "map-components-angular-template";

  constructor() {
    // Log when the constructor is invoked
    console.log("ArcMapComponent constructor called");  
  }

  arcgisViewReadyChange(event: any) {
    // Log when the view is ready
    console.log("MapView ready", event);
  }

  ngOnInit(): void {
    defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets" });
    
    // Log when ngOnInit lifecycle hook is called
    console.log("ngOnInit called: component initialization");

    esriConfig.apiKey = environment.arcgisApiKey;
    
  }

    // Other lifecycle hooks for debugging
  ngAfterViewInit(): void {
    // Log when the view is fully initialized
    console.log("ngAfterViewInit: View initialization is complete");  
  }

  ngOnDestroy(): void {
    // Log when the component is destroyed
    console.log("ngOnDestroy: Component is being destroyed");  
  }

}








