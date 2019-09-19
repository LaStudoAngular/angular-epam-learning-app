import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSource = new BehaviorSubject<boolean>(null);
  public isAuth$ = this.isAuthSource.asObservable();

  constructor() {}

  public login(email?: string, password?: string): void {
    this.isAuthSource.next(true);
    localStorage.setItem('user', JSON.stringify({ email, password }));
  }

  public logout(): void {
    this.isAuthSource.next(false);
    localStorage.removeItem('user');
  }

  public getUserInfo(): { email: string; password: string } {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    if (loginUser) {
      return loginUser;
    }
  }
}
