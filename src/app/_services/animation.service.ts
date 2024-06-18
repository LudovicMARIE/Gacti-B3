import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Animation } from '../_interfaces/activity';
import { HttpClientService } from './http-client.service';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private apiUrl = environment.apiUrl;

constructor(private http: HttpClientService) { }

  getAllAnimation(): Observable<any> {
    return this.http.get(`/api/animations`);
  }

  getAnimationById(codeanim: string): Observable<any> {
    return this.http.get(`/api/animations/${codeanim}`);
  }

  createAnimation(data: Animation): Observable<any> {
    return this.http.post(`/api/animations`, data);
  }

  updateAnimation(codeanim: string, data: Animation): Observable<any> {
    return this.http.put(`/api/animations/${codeanim}`, data);
  }

  deleteAnimation(codeanim: string): Observable<any> {
    return this.http.delete(`/api/animations/${codeanim}`);
  }

}
