import { Action } from '@ngrx/store';
import { Course } from '../../@models/course';

export enum ECourseActions {
  GetCourses = '[Course] Get Courses',
  GetCoursesSuccess = '[Course] Get Courses Success',
}

export class GetCourses implements Action {
  public readonly type = ECourseActions.GetCourses;
}

export class GetCoursesSuccess implements Action {
  public readonly type = ECourseActions.GetCoursesSuccess;
  constructor(public payload: Course[]) {}
}

export type CourseActions = GetCourses | GetCoursesSuccess;