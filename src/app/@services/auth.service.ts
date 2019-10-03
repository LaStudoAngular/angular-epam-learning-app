import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../@models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSource = new BehaviorSubject<boolean>(null);
  public isAuth$ = this.isAuthSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // ПРИ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ isAuth$ === NULL, ДАЖЕ ЕСЛИ user ЕСТЬ В LOCALSTORAGE
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.isAuthSource.next(true);
    } else {
      this.isAuthSource.next(false);
    }
  }

  public login(login: string, password: string): void {
    this.http
      .get(`${environment.baseURL}/users?login=${login}&password=${password}`)
      .subscribe((response: User[] | []) => {
        if (response.length !== 0) {
          this.isAuthSource.next(true);
          localStorage.setItem('user', JSON.stringify(response[0]));
          this.router.navigate(['courses']);
        } else {
          this.isAuthSource.next(false);
        }
      });
  }

  public logout(): void {
    this.isAuthSource.next(false);
    localStorage.removeItem('user');
  }

  getUser(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user')));
  }
}
