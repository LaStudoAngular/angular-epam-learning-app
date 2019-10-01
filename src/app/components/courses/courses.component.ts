import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../@models/course';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  search: string;
  courses: Course[];
  showMore = false;
  spinner: boolean;
  private destroy = new Subject();
  constructor(
    private courseService: CourseService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.courseService.courses$
      .pipe(takeUntil(this.destroy))
      .subscribe((response: Course[]) => (this.courses = response));
    this.courseService.spinner$
      .pipe(takeUntil(this.destroy))
      .subscribe((response: boolean) => (this.spinner = response));
  }

  onAddNewCourse(): void {
    this.courseService.title$.next('new course');
    this.router.navigate(['courses/new']);
  }

  public loadMore(): void {
    this.courseService.getPortionOfCourses();
  }

  public onSearch(): void {
    this.http
      .get(`http://localhost:3004/courses?textFragment=${this.search}`)
      .subscribe(response => console.log(response));
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
