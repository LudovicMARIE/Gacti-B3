import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
constructor() { }


createSession(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
}


getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}


destroySession() {
  localStorage.removeItem('user');
}


}
