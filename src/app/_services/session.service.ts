import { Inject, Injectable, InjectionToken } from '@angular/core';
import { User } from '../_interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentPageSubject: BehaviorSubject<string>;
  public currentPage: Observable<string>;

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { 
    this.currentPageSubject = new BehaviorSubject<string>(this.getCurrentPage() ?? '');
    this.currentPage = this.currentPageSubject.asObservable();
  }


  createSession(user: User) {
    this.storage.setItem('user', JSON.stringify(user));
  }


getUser() {
  const user = this.storage.getItem('user');
  return user ? JSON.parse(user) : null;
}


destroySession() {
  this.storage.removeItem('user');
}

setCurrentPage(page: string) {
  this.storage.setItem('currentPage', page);
  this.currentPageSubject.next(page);
}

getCurrentPage() {
  return this.storage.getItem('currentPage');
}


}
