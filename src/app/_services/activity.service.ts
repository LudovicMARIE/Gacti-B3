import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Activity } from '../_interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompteActivite(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/activities`);
  }

  getAllActivites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities`);
  }

  getActiviteById(codeanim: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/${codeanim}`);
  }

  createActivite(data: Activity): Observable<any> {
    return this.http.post(`${this.apiUrl}/activities`, data);
  }

  updateActivite(codeActivite: number, data: Activity): Observable<any> {
    return this.http.put(`${this.apiUrl}/activities/${codeActivite}`, data);
  }

  deleteActivite(codeanim: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/activities/${codeanim}`);
  }




  //Old code

  getActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities`);
  }

  getActivityByAnimType(codeanim: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/${codeanim}`);
  }

  registerActivity(credentials: { username: string; codeanim: string; dateact: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-activity`,credentials);
  }

  getActivityType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/animation-types`);
  }

  getActivitiesRegisteredByUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/registered/${username}`);
  }

  deleteRegistration(registrationNumber: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/activities/registered/${registrationNumber}`);
  }

  deleteActivity(codeAnim: string, dateAct: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-activity/${codeAnim}/${dateAct}`);
  }


}
