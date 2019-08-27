import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';

@Component({
  selector: 'ep-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @HostBinding() readonly class = 'container';
  isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthSource.subscribe((response: boolean) => (this.isAuth = response));
  }
}
