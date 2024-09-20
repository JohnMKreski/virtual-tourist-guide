import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../activities/activity-interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private url = 'http://localhost:5200';
  activities$ = signal<Activity[]>([]);
  activity$ = signal<Activity>({} as Activity);
  
  constructor(private httpClient: HttpClient) { }

  private refreshActivities() {
    this.httpClient.get<Activity[]>(`${this.url}/activities`)
      .subscribe(activities => {
        this.activities$.set(activities);
      });
  }

  getActivities() {
    this.refreshActivities();
    return this.activities$();
  }

  getActivity(id: string) {
    this.httpClient.get<Activity>(`${this.url}/activities/${id}`).subscribe(activity => {
      this.activity$.set(activity);
      return this.activity$();
    });
  }

  createActivity(activity: Activity) {
    return this.httpClient.post(`${this.url}/activities`, activity, { responseType: 'text' });
  }

  updateActivity(id: string, activity: Activity) {
    return this.httpClient.put(`${this.url}/activities/${id}`, activity, { responseType: 'text' });
  }

  deleteActivity(id: string) {
    return this.httpClient.delete(`${this.url}/activities/${id}`, { responseType: 'text' });
  }
}