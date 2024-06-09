import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getComptes(): Observable<any> {
  return this.http.get(`/api/users`);
}

getCompte(username: string): Observable<any> {
  return this.http.get(`/api/users/${username}`);
}

updateCompte(username: string, data: User): Observable<any> {
  return this.http.put(`/api/users/${username}`, data);
}

getComptesByType(type: string): Observable<any> {
  return this.http.get(`/api/users/type/${type}`);
}

deleteCompte(username: string): Observable<any> {
  return this.http.delete(`/api/users/${username}`);
}

purgeActivity(username: string): Observable<any> {
  return this.http.delete(`/api/users/${username}/activities`);
}

}
