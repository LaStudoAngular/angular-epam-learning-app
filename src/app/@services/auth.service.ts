import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSource = new BehaviorSubject<boolean>(true);
  public isAuth$ = this.isAuthSource.asObservable();
  public isNotAuth$ = this.isAuth$.pipe(map(v => !v));

  constructor(private router: Router) {}

  public login(email?: string, password?: string): void {
    this.isAuthSource.next(false);
    this.router.navigate(['courses']);
    localStorage.setItem('user', JSON.stringify({ email, password }));
    console.log(`logged in successfully`);
  }

  public logout(): void {
    this.isAuthSource.next(true);
    this.router.navigate(['login']);
    localStorage.removeItem('user');
  }

  public getUserInfo(): { email: string; password: string } {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    if (loginUser) {
      return loginUser;
    }
  }
}
