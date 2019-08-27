import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isAuthenticated: boolean;

  public login(): void {
    //
  }

  public logout(): void {
    window.localStorage.removeItem('user');
    console.log(`user logout`);
  }

  public getUserInfo(): void {
    //
  }
}
