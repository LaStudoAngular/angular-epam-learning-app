import { Injectable } from '@angular/core';
import { User } from '../@interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isAuthenticated = false;

  public login(email: string, password: string): void {
    this.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify({ email, password }));
    console.log(`logged in successfully`);
  }

  public logout(): void {
    this.isAuthenticated = false;
    window.localStorage.removeItem('user');
    console.log(`user logout`);
  }

  public getUserInfo(): { email: string; password: string } {
    const loginUser = JSON.parse(window.localStorage.getItem('user'));
    if (loginUser) {
      return loginUser;
    }
  }
}
