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
  return this.http.get(`${this.apiUrl}/users`);
}

getCompte(username: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/${username}`);
}

updateCompte(username: string, data: User): Observable<any> {
  return this.http.put(`${this.apiUrl}/users/${username}`, data);
}

getComptesByType(type: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/type/${type}`);
}

deleteCompte(username: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/users/${username}`);
}

}
