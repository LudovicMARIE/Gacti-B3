import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

constructor() { }

// Store user data in local storage
createSession(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Get user data from local storage
getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Clear user data from local storage
destroySession() {
  localStorage.removeItem('user');
}


}
