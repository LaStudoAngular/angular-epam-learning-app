import { Course } from '../../@models/course';

export interface ICourseStates {
  courses: Course[];
}

export const initialCourseStates: ICourseStates = {
  courses: [],
};
