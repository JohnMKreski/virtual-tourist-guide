import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { MapComponent } from './map/map.component';
import { ComponentLibraryModule } from '@arcgis/map-components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActivitiesListComponent, MatToolbarModule, NavBarComponent, MapComponent, ComponentLibraryModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
