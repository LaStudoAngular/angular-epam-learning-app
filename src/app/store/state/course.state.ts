import { Course } from '../../@models/course';

export interface ICourseState {
  courses: Course[];
}

export const initialCourseState: ICourseState = {
  courses: null,
};
