import { Action } from '@ngrx/store';
import { Course } from '../../@models/course';

export enum ECourseActions {
  GetCourses = '[Course] Get Courses',
  GetCoursesSuccess = '[Course] Get Courses Success',
  DeleteCourse = '[Course] Delete Course',
  DeleteCourseSuccess = '[Course] Delete Course Success',
}

export class GetCourses implements Action {
  public readonly type = ECourseActions.GetCourses;
}

export class GetCoursesSuccess implements Action {
  public readonly type = ECourseActions.GetCoursesSuccess;
  constructor(public payload: Course[]) {}
}

export class DeleteCourse implements Action {
  public readonly type = ECourseActions.DeleteCourse;
  constructor(public payload: Course) {}
}

export class DeleteCourseSuccess implements Action {
  public readonly type = ECourseActions.DeleteCourseSuccess;
}

export type CourseActions = GetCourses | GetCoursesSuccess | DeleteCourse | DeleteCourseSuccess;
