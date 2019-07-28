import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'ep-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @HostBinding() readonly class = 'container';

  constructor() {}

  ngOnInit() {}
}
