import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../@interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSource = new BehaviorSubject<boolean>(null);
  public isAuth$ = this.isAuthSource.asObservable();

  constructor() {
    // костыль из-за отсутствия NgRx
    // при перезагрузки страницы isAuth === null, даже если user есть в localStorage
    const user: Login = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.isAuthSource.next(true);
    } else {
      this.isAuthSource.next(false);
    }
  }

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
