import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsAuth().subscribe((response: boolean) => (this.isAuth = response));
  }

  onLogOut(): void {
    this.authService.logout();
  }
}
