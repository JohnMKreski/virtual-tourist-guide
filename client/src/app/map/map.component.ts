import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, Inject  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Map, MapStyle, MapGeoJSONFeature, StyleSetterOptions, ElevationAtOptions, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
// import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  // layer: Layer | undefined;

  @ViewChild('map', { static: false })
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  
  ngOnInit(): void {
    config.apiKey = 'Pikj0OrTBehy4VtcBYX4';
  }
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tokyo = { lng: 139.753, lat: 35.6844, zoom: 14 };
      const salida = { lng: -106, lat: 38.53, zoom: 14 };
      
      
      // 1) The container option sets the DOM element in which the map will be rendered. 
      // We will assign the ElementRef (obtained thanks to the @ViewChild) 
      // expected by our component to an HTML element, which will act as a container. 
      // Keep in mind that it can only be used after the execution of the 
      // ngAfterViewInit hook.

      // 2) The style option defines what style is the map going to use.
      // 3) The center and zoom options set the starting position of the map.
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.OUTDOOR,
        center: [salida.lng, salida.lat],
        zoom: salida.zoom,
        terrain: true,
        terrainControl: true,
        terrainExaggeration: 1,
        pitch: 70,
        maxPitch: 85,
        maxZoom: 22,
        scaleControl: true,
        geolocate: true,
        fullscreenControl: true,
        hash: true,
        bearing: -100,
      }); 

      // const styleDropDown = document.getElementById("mapstyles-picker")

      // styleDropDown.onchange = (evt) => {
      //   map.setStyle(styleDropDown.value)
      // }

      // this.map.onLoadAsync();

      // this.map?.addSource('play-holes', {
      //   type: "geojson",
      //   data: "https://api.maptiler.com/data/e6c36797-ac42-4dbc-b498-aa1dda19e8f1/features.json?key=Pikj0OrTBehy4VtcBYX4"
      // });
  

      new Marker({color: "#FF0000"})
        //Long, Lat
        .setLngLat([ -105.99121356408517 ,38.537944364015125])
        .addTo(this.map);

      // this.map.on() => {rotateTo.

        // this.map.on('click', async function() {
        //   if (this.map.hasTerrain()) {
        //     this.map.disableTerrain();
        //   } else {
        //     map.enableTerrain();
        //   }
        // });

        this.map.disableTerrain();

      // this.map.addLayer({
      //   "source-layer",
      // });

      // map.on('load', async function() {
      //   const geojson = await maptilersdk.data.get('e6c36797-ac42-4dbc-b498-aa1dda19e8f1');
      //   map.addSource('gps_tracks', {
      //     'type': 'geojson',
      //     'data': geojson
      //   });
      //   map.addLayer({
      //     'id': 'grand_teton',
      //     'type': 'line',
      //     'source': 'gps_tracks',
      //     'layout': {},
      //     'paint': {
      //       'line-color': '#e11',
      //       'line-width': 4
      //     }
      //   });
      // });
    };
  }
  
  // map.on('load', async function() {
  //   const geojson = await maptilersdk.data.get('YOUR_MAPTILER_DATASET_ID_HERE');
  //   map.addSource('gps_tracks', {
  //   'type': 'geojson',
  //   'data': geojson
  //   });
  // }

  ngOnDestroy() {
    if (this.map && isPlatformBrowser(this.platformId)) {
      this.map?.remove();
    }
  }
}
