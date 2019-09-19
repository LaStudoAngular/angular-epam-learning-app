import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
