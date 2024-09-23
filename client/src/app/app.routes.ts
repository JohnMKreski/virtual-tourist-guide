import { Routes } from '@angular/router';
import { ActivitiesListComponent } from './activities/activities-list/activities-list.component';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { EditActivityComponent } from './activities/edit-activity/edit-activity.component';
import { HomeComponent } from './home/home.component';
import { ArcMapPageComponent } from './arc-map-page/arc-map-page.component';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    component: HomeComponent, 
  },
  { 
    path: 'arc-map-page', 
    component: ArcMapPageComponent, 
  },
  { 
    path: 'activities', 
    component: ActivitiesListComponent, 
    title: 'Activities List', 
    children: [
      { 
        path: 'add-activity', 
        component: AddActivityComponent 
      },
      { 
        path: 'edit/:id', 
        component: EditActivityComponent 
      },
    ]
  },
  
];