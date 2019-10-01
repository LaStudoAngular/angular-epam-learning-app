import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../@models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService, private router: Router) {}
  user: User;
  private destroy = new Subject();

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy))
      .subscribe((user: User) => (this.user = user));
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
