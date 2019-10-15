import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../@models/course';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  map,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ICourseStates } from 'src/app/store/state/course.states';
import { selectCourses } from 'src/app/store/selectors/course.selectors';
import { SearchCourse, SearchCourseError } from 'src/app/store/actions/course.actions';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @ViewChild('input', { static: true }) input: ElementRef;

  courses: Course[];
  showMore = false;
  indicator = true;
  private destroy = new Subject();

  constructor(
    private courseService: CourseService,
    private router: Router,
    private store: Store<ICourseStates>
  ) {}

  ngOnInit() {

    // GET COURSES FROM DATABASE
    this.store.pipe(select(selectCourses), takeUntil(this.destroy))
      .subscribe((response: Course[]) => {
        this.courses = response;
        setTimeout(() => this.indicator = false, 1000);
      });

    // SEARCH COURSE
    fromEvent(this.input.nativeElement, 'input').pipe(
      debounceTime(2000),
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      map((value: string) => {
        if (value.length >= 3) {
          this.store.dispatch(new SearchCourse(value));
        } else {
          this.store.dispatch(new SearchCourseError);
        }
      }),
      takeUntil(this.destroy)
    ).subscribe(() => {})

  }

  onAddNewCourse(): void {
    this.courseService.title$.next('new course');
    this.router.navigate(['courses/new']);
  }

  public loadMore(): void {
    this.courseService.getPortionOfCourses();
  }

  trackByFn(index: any, item: any): void {
    return item ? item.id : undefined;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
