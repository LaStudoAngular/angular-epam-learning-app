import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}
  userName: string;

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('user')).email;
  }

  onLogOut(): void {
    this.authService.logout();
  }
}
