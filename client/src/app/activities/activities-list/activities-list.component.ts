import { Component, OnInit, WritableSignal } from '@angular/core';
import { Activity } from '../activity-interface';
import { ActivityService } from '../../shared/services/activity.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styleUrl: './activities-list.component.scss',
  templateUrl: './activities-list.component.html',
})

export class ActivitiesListComponent implements OnInit {
  activities$ = {} as WritableSignal<Activity[]>;
  displayedColumns: string[] = [
    'col-activityName',
    'col-location',
    'col-difficultyLevel',
    'col-action',
  ];

  constructor(private activitiesService: ActivityService) {}

  ngOnInit() {
    this.fetchActivities();
  }

  deleteActivity(id: string): void {
    this.activitiesService.deleteActivity(id).subscribe({
      next: () => this.fetchActivities(),
    });
  }

  private fetchActivities(): void {
    this.activities$ = this.activitiesService.activities$;
    this.activitiesService.getActivities();
  }
}