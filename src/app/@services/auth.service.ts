import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    // ПРИ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ isAuth$ === NULL, ДАЖЕ ЕСЛИ fakeToken ЕСТЬ В LOCALSTORAGE
    const token: string = JSON.parse(localStorage.getItem('fakeToken'));
    if (token) {
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
          this.router.navigate(['courses']);
          localStorage.setItem('fakeToken', JSON.stringify(response[0].fakeToken));
        } else {
          this.isAuthSource.next(false);
        }
      });
  }

  public logout(): void {
    this.isAuthSource.next(false);
    localStorage.removeItem('fakeToken');
  }

  // get token
  public getToken(): string {
    return localStorage.getItem('fakeToken');
  }
}
