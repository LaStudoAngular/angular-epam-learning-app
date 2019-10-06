import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CourseService } from '../../@services/course.service';
import { ECourseActions, GetCourses } from '../actions/course.actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Course } from '../../@models/course';

@Injectable()
export class CourseEffects {
  constructor(
    private actions: Actions,
    private courseService: CourseService,
  ) {}

  @Effect()
  GetCourses$ = this.actions.pipe(
    ofType<GetCourses>(ECourseActions.GetCourses),
    switchMap(() => this.courseService.getCourses()),
    switchMap((courses: Course[]) => of(new ECourseActions.GetCoursesSuccess(courses)),
  );
}
