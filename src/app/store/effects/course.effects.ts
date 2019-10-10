import { Injectable } from '@angular/core';
import { act, Actions, Effect, ofType } from '@ngrx/effects';
import { CourseService } from '../../@services/course.service';
import {
  DeleteCourse,
  DeleteCourseSuccess,
  ECourseActions,
  GetCoursesSuccess,
} from '../actions/course.actions';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from '../../@models/course';

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions, private courseService: CourseService) {}

  @Effect() GetCourses$ = this.actions$.pipe(
    ofType(ECourseActions.GetCourses),
    switchMap(() => this.courseService.getCourse()),
    switchMap((courses: Course[]) => of(new GetCoursesSuccess(courses))),
  );

  @Effect() DeleteCourse$ = this.actions$.pipe(
    ofType(ECourseActions.DeleteCourse),
    switchMap((action: DeleteCourse) => of(action.payload)),
    switchMap((course: Course) =>
      this.courseService
        .deleteCourse(course)
        .pipe(
          map(
            () => new DeleteCourseSuccess(course.id),
            this.courseService.dialogSource.next(false),
          ),
        ),
    ),
  );
}
