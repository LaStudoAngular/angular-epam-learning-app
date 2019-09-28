import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../@models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSource = new BehaviorSubject<boolean>(null);
  public isAuth$ = this.isAuthSource.asObservable();

  constructor(private http: HttpClient) {
    // при перезагрузки страницы isAuth === null, даже если token есть в localStorage
    const token: string = JSON.parse(localStorage.getItem('fakeToken'));
    if (token) {
      this.isAuthSource.next(true);
    } else {
      this.isAuthSource.next(false);
    }
  }

  public login(login: string, password: string): void {
    this.http.get(`${environment.baseURL}/users`).subscribe((users: User[]) => {
      const user: User = users.find(
        el =>
          el.login.toLowerCase() === login.toLowerCase() &&
          el.password.toLowerCase() === password.toLowerCase(),
      );
      if (user) {
        this.isAuthSource.next(true);
        localStorage.setItem('fakeToken', JSON.stringify(user.fakeToken));
      }
    });
  }

  public logout(): void {
    this.isAuthSource.next(false);
    localStorage.removeItem('fakeToken');
  }
}
