import { Action } from '@ngrx/store';
import { Course } from '../../@models/course';

export enum ECourseActions {
  GetCourses = '[Course] Get Courses',
  GetCoursesSuccess = '[Course] Get Courses Success',
  DeleteCourse = '[Course] Delete Course',
  DeleteCourseSuccess = '[Course] Delete Course Success',
  EditCourse = '[Course] Edit Course',
  EditCourseSuccess = '[Course] Edit Course Success',
  CreateCourse = '[Course] Create Course',
  CreateCourseSuccess = '[Course] Create Course Success',
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
}

export class DeleteCourseSuccess implements Action {
  public readonly type = ECourseActions.DeleteCourseSuccess;
}

export class EditCourse implements Action {
  public readonly type = ECourseActions.EditCourse;
}

export class EditCourseSuccess implements Action {
  public readonly type = ECourseActions.EditCourseSuccess;
  constructor(public payload: Course) {}
}

export class CreateCourse implements Action {
  public readonly type = ECourseActions.CreateCourse;
}

export class CreateCourseSuccess implements Action {
  public readonly type = ECourseActions.CreateCourseSuccess;
  constructor(public payload: Course) {}
}

export type CourseActions =
  | GetCourses
  | GetCoursesSuccess
  | DeleteCourse
  | DeleteCourseSuccess
  | EditCourse
  | EditCourseSuccess
  | CreateCourse
  | CreateCourseSuccess;
