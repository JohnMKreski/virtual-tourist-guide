import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import { ActivityService } from '../../shared/services/activity.service';
import { Activity } from '../../activities/activity-interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [ActivityFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Activity</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-activity-form
          (formSubmitted)="addActivity($event)"
        ></app-activity-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddActivityComponent {
  constructor(
    private router: Router,
    private activityService: ActivityService
  ) {}

  addActivity(activity: Activity) {
    this.activityService.createActivity(activity).subscribe({
      next: () => {
        this.router.navigate(['/activities'])
        .then(() => {
          window.location.reload()
        });
      },
      error: (error) => {
        alert('Failed to create activity');
        console.error(error);
      },
    });
    this.activityService.getActivities();
  }
}