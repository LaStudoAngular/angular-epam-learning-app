import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICourseStates } from '../state/course.states';
import { Course } from 'src/app/@models/course';

export const selectCourseFeature = createFeatureSelector<ICourseStates>('courses');

export const selectCourses = createSelector(
  selectCourseFeature,
  (state: ICourseStates) => state.courses
);

export const selectSelectedCourse = (id: number) => createSelector(
  selectCourseFeature,
  (state: ICourseStates) => state.courses.filter((el: Course) => el.id === id)[0]
)
