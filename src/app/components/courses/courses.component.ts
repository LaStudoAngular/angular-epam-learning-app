import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../@models/course';
import { HttpClient } from '@angular/common/http';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  isEmpty,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { EMPTY, fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @ViewChild('input', { static: true }) input: ElementRef;
  courses: Course[];
  originCourses: Course[] = [];
  showMore = false;
  indicator = true;

  private destroy = new Subject();
  constructor(
    private courseService: CourseService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // GET COURSES FROM DATABASE
    this.courseService.courses$
      .pipe(takeUntil(this.destroy))
      .subscribe((response: Course[]) => (this.courses = response));

    // INITIALIZE INDICATOR STATUS
    this.courseService.spinner$
      .pipe(
        delay(1000),
        takeUntil(this.destroy),
      )
      .subscribe((response: boolean) => (this.indicator = response));

    // SEARCH
    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((event: any) => {
          const value: string = event.target.value;
          if (value.length >= 3) {
            return this.http.get(`http://localhost:3004/courses?textFragment=${value}`);
          } else {
            return EMPTY.pipe(isEmpty());
          }
        }),
      )
      .subscribe((response: Course[]) => {
        if (Array.isArray(response)) {
          this.courses = response;
        } else {
          this.courseService.courses$
            .pipe(takeUntil(this.destroy))
            .subscribe((response: Course[]) => (this.courses = response));
        }
      });
  }

  onAddNewCourse(): void {
    this.courseService.title$.next('new course');
    this.router.navigate(['courses/new']);
  }

  public loadMore(): void {
    this.courseService.getPortionOfCourses();
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
