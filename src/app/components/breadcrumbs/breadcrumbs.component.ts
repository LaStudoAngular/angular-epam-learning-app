import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { CourseService } from '../../@services/course.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ep-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  @HostBinding() readonly class = 'container';
  public title = '';
  private destroy = new Subject();

  constructor(public authService: AuthService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.titleSource
      .pipe(takeUntil(this.destroy))
      .subscribe((response: string) => (this.title = response));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onClick() {
    this.courseService.title$.next('');
  }
}
