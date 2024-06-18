import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Activity, ActivityInserted } from '../_interfaces/activity';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClientService) { }

  getCompteActivite(username: string): Observable<any> {
    return this.http.get(`/api/users/${username}/activities`);
  }

  getAllActivites(): Observable<any> {
    return this.http.get(`/api/activities`);
  }

  getAllActivitesByType(typeAnimation: string): Observable<any> {
    return this.http.get(`/api/activities/type/${typeAnimation}`);
  }

  getActiviteById(codeanim: number): Observable<any> {
    return this.http.get(`/api/activities/${codeanim}`);
  }

  createActivite(data: ActivityInserted): Observable<any> {
    return this.http.post(`/api/activities`, data);
  }

  updateActivite(codeActivite: number, data: Activity): Observable<any> {
    return this.http.put(`/api/activities/${codeActivite}`, data);
  }

  deleteActivite(codeanim: number): Observable<any> {
    return this.http.delete(`/api/activities/${codeanim}`);
  }

  registerActivity(idUser: string, idActivite: number): Observable<any> {
    return this.http.post(`/api/users/${idUser}/activities/${idActivite}`, {});
  }

  unregisterActivity(idUser: string, idActivite: number): Observable<any> {
    return this.http.post(`/api/users/${idUser}/activities/delete/${idActivite}`, {});
  }

  getActivitesregisteredByUser(idUser: string): Observable<any> {
    return this.http.get(`/api/users/${idUser}/activities`);
  }

  getUserListByActivity(idActivite: number): Observable<any> {
    return this.http.get(`/api/users/activity/${idActivite}`);
  }

  cancelActivity(activite: Activity): Observable<any> {
    return this.http.put(`/api/activities/${activite.idActivite}`, activite);
  }




  //Old code

  // getActivities(): Observable<any> {
  //   return this.http.get(`/api/activities`);
  // }

  // getActivityByAnimType(codeanim: string): Observable<any> {
  //   return this.http.get(`/api/activities/${codeanim}`);
  // }

  // registerActivity(credentials: { username: string; codeanim: string; dateact: string; }): Observable<any> {
  //   return this.http.post(`/api/register-activity`,credentials);
  // }

  // getActivityType(): Observable<any> {
  //   return this.http.get(`/api/animation-types`);
  // }

  // getActivitiesRegisteredByUser(username: string): Observable<any> {
  //   return this.http.get(`/api/activities/registered/${username}`);
  // }

  // deleteRegistration(registrationNumber: number): Observable<any> {
  //   return this.http.delete(`/api/activities/registered/${registrationNumber}`);
  // }

  // deleteActivity(codeAnim: string, dateAct: string): Observable<any> {
  //   return this.http.delete(`/api/delete-activity/${codeAnim}/${dateAct}`);
  // }


}
