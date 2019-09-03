import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';

@Component({
  selector: 'ep-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @HostBinding() readonly class = 'container';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
