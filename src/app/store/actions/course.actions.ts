import { Action } from '@ngrx/store';
import { Course } from '../../@models/course';

export enum ECourseActions {
  GetCourses = '[Course] Get Courses',
  GetCoursesSuccess = '[Course] Get Courses Success',
  DeleteCourse = '[Course] Delete Course',
  DeleteCourseSuccess = '[Course] Delete Course Success',
  AddCourse = '[Course] Add Course',
  AddCourseSuccess = '[Course] Add Course Success',
  EditCourse = '[Course] Edit Course',
  EditCourseSuccess = '[Course] Edit Course Success',
  SearchCourse = '[Course] Search Course',
  SearchCourseSuccess = '[Course] Search Course Success',
  SearchCourseError = '[Course] Search Course Error',
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
  constructor(public payload: number) {}
}

export class AddCourse implements Action {
  public readonly type = ECourseActions.AddCourse;
  constructor(public payload: Course) {}
}

export class AddCourseSuccess implements Action {
  public readonly type = ECourseActions.AddCourseSuccess;
  constructor(public payload: Course) {}
}

export class EditCourse implements Action {
  public readonly type = ECourseActions.EditCourse;
  constructor(public payload: Course) { }
}

export class EditCourseSuccess implements Action {
  public readonly type = ECourseActions.EditCourseSuccess;
  constructor(public payload: Course) { }
}

export class SearchCourse implements Action {
  public readonly type = ECourseActions.SearchCourse;
  constructor(public payload: string) {}
}

export class SearchCourseSuccess implements Action {
  public readonly type = ECourseActions.SearchCourseSuccess;
  constructor(public payload: Course[]) {}
}

export class SearchCourseError implements Action {
  public readonly type = ECourseActions.SearchCourseError;
}

export type CourseActions =
  | GetCourses
  | GetCoursesSuccess
  | DeleteCourse
  | DeleteCourseSuccess
  | AddCourse
  | AddCourseSuccess
  | EditCourse
  | EditCourseSuccess
  | SearchCourse
  | SearchCourseSuccess;
