import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities`);
  }

  getActivityByAnimType(codeanim: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activity/${codeanim}`);
  }

  registerActivity(credentials: { username: string; codeanim: string; dateact: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerActivity`,credentials);
  }

  getActivityType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/animationType`);
  }


}
