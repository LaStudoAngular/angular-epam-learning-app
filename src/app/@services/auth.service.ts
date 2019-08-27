import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  public login(email: string, password: string): void {
    this.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify({ email, password }));
    console.log(`logged in successfully`);
  }

  public logout(): void {
    this.isAuthenticated = false;
    window.localStorage.removeItem('user');
    this.router.navigate(['courses']);
    console.log(`user logout`);
  }

  public getUserInfo(): { email: string; password: string } {
    const loginUser = JSON.parse(window.localStorage.getItem('user'));
    if (loginUser) {
      return loginUser;
    }
  }

  public getIsAuth(): boolean {
    return this.isAuthenticated;
  }
}
