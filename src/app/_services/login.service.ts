import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_interfaces/user';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClientService) {}

  login(credentials: { mail: string; mdp: string }): Observable<any> {
    return this.http.post(`/api/users/login`,credentials);
  }

  register(user: User): Observable<any> {
    return this.http.post(`/api/users/register`, user);
  }
}
