import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) {

 }

 login(credentials: { username: string; password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials);
}

}
