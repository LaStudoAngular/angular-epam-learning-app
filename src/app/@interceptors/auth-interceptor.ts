import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../@services/auth.service';
import { User } from '../@models/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getUser().subscribe((user: User) => {
      if (user) {
        req = req.clone({
          setHeaders: {
            Authorization: user.fakeToken,
          },
        });
      }
    });
    return next.handle(req);
  }
}
