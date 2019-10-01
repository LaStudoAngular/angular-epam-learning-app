import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../@models/user';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  user: User;

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => (this.user = user));
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
