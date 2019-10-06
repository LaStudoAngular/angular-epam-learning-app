import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CourseService } from '../../@services/course.service';
import {
  CreateCourse,
  CreateCourseSuccess,
  DeleteCourse,
  DeleteCourseSuccess,
  ECourseActions,
  EditCourse,
  EditCourseSuccess,
  GetCourses,
  GetCoursesSuccess,
} from '../actions/course.actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Course } from '../../@models/course';

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions, private courseService: CourseService) {}

  @Effect()
  GetCourses$ = this.actions$.pipe(
    ofType<GetCourses>(ECourseActions.GetCourses),
    switchMap(() => this.courseService.getCourses()),
    switchMap((courses: Course[]) => of(new GetCoursesSuccess(courses))),
  );

  @Effect()
  DeleteCourse$ = this.actions$.pipe(
    ofType<DeleteCourse>(ECourseActions.DeleteCourse),
    switchMap((course: Course) => this.courseService.removeCourse(course)),
    switchMap(() => of(new DeleteCourseSuccess())),
  );

  @Effect()
  EditCourse$ = this.actions$.pipe(
    ofType<EditCourse>(ECourseActions.EditCourse),
    switchMap((course: Course) => this.courseService.editCourse(course)),
    switchMap((course: Course) => of(new EditCourseSuccess(course))),
  );

  @Effect()
  CreateCourse$ = this.actions$.pipe(
    ofType<CreateCourse>(ECourseActions.CreateCourse),
    switchMap((course: Course) => this.courseService.createCourse(course)),
    switchMap((response: Course) => of(new CreateCourseSuccess(response))),
  );
}
