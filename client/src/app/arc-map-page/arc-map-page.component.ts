import { Component } from '@angular/core';
import { ArcMapComponent } from '../arc-map/arc-map.component';

@Component({
  selector: 'app-arc-map-page',
  standalone: true,
  imports: [ArcMapComponent],
  templateUrl: './arc-map-page.component.html',
  styleUrl: './arc-map-page.component.scss'
})
export class ArcMapPageComponent {

}
