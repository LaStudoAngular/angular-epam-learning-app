import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICourseStates } from '../state/course.states';

export const selectCourseFeature = createFeatureSelector<ICourseStates>('courses');

export const selectCourses = createSelector(
  selectCourseFeature,
  (state: ICourseStates) => state.courses
);
