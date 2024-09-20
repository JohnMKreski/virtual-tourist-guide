import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../activity-interface';
import { ActivityService } from '../../shared/services/activity.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-activity',
  standalone: true,
  imports: [ActivityFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit an Activity</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-activity-form
          [initialState]="activity()"
          (formSubmitted)="editActivity($event)"
        ></app-activity-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditActivityComponent implements OnInit {
  activity = {} as WritableSignal<Activity>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.activityService.getActivity(id!);
    this.activity = this.activityService.activity$;
  }

  editActivity(activity: Activity) {
    this.activityService
      .updateActivity(this.activity()._id || '', activity)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update activity');
          console.error(error);
        },
      });
  }
}