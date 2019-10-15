import { Injectable } from '@angular/core';
import { act, Actions, Effect, ofType } from '@ngrx/effects';
import { CourseService } from '../../@services/course.service';
import {
  AddCourse,
  AddCourseSuccess,
  DeleteCourse,
  DeleteCourseSuccess,
  ECourseActions,
  GetCoursesSuccess,
  EditCourse,
  EditCourseSuccess,
  SearchCourse,
  SearchCourseSuccess,
} from '../actions/course.actions';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from '../../@models/course';
import { Router } from '@angular/router';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private router: Router,
  ) {}

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
        .pipe(map(() => new DeleteCourseSuccess(course.id), this.courseService.dialogClose())),
    ),
  );

  @Effect() AddCourse$ = this.actions$.pipe(
    ofType(ECourseActions.AddCourse),
    switchMap((action: AddCourse) => of(action.payload)),
    switchMap((course: Course) =>
      this.courseService
        .addCourse(course)
        .pipe(map(() => new AddCourseSuccess(course), this.router.navigate(['courses']))),
    ),
  );

  @Effect() EditCourse$ = this.actions$.pipe(
    ofType(ECourseActions.EditCourse),
    switchMap((action: EditCourse) => of(action.payload)),
    switchMap((course: Course) =>
      this.courseService
        .alterCourse(course)
        .pipe(map(() => new EditCourseSuccess(course), this.router.navigate(['courses']))),
    ),
  );

  @Effect() SearchCourse$ = this.actions$.pipe(
    ofType(ECourseActions.SearchCourse),
    switchMap((action: SearchCourse) => of(action.payload)),
    switchMap((value: string) => this.courseService.searchCourses(value)),
    switchMap((courses: Course[]) => of(new SearchCourseSuccess(courses)))
  );

  @Effect() SearchCourseError$ = this.actions$.pipe(
    ofType(ECourseActions.SearchCourseError),
    switchMap(() => this.courseService.getCourse()),
    switchMap((courses: Course[]) => of(new GetCoursesSuccess(courses))),
  );
}
