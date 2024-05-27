import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Animation } from '../_interfaces/activity';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getAllAnimation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/animations`);
  }

  getAnimationById(codeanim: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/animations/${codeanim}`);
  }

  createAnimation(data: Animation): Observable<any> {
    return this.http.post(`${this.apiUrl}/animations`, data);
  }

  updateAnimation(codeanim: string, data: Animation): Observable<any> {
    return this.http.put(`${this.apiUrl}/animations/${codeanim}`, data);
  }

  deleteAnimation(codeanim: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/animations/${codeanim}`);
  }

}
