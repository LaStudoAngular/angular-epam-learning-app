import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { CourseService } from '../../@services/course.service';

@Component({
  selector: 'ep-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @HostBinding() readonly class = 'container';
  public title = '';

  constructor(public authService: AuthService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.titleSource.subscribe(data => (this.title = data));
  }
}
