import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  isAuth$ = new BehaviorSubject<boolean>(true);
  isAuthSource = this.isAuth$.asObservable();

  constructor(private router: Router) {}

  public login(email?: string, password?: string): void {
    this.isAuthenticated = true;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
    localStorage.setItem('user', JSON.stringify({ email, password }));
    console.log(`logged in successfully`);
  }

  public logout(): void {
    this.isAuthenticated = false;
    this.isAuth$.next(true);
    this.router.navigate(['courses']);
    window.localStorage.removeItem('user');
  }

  public getUserInfo(): { email: string; password: string } {
    const loginUser = JSON.parse(window.localStorage.getItem('user'));
    if (loginUser) {
      return loginUser;
    }
  }
}
