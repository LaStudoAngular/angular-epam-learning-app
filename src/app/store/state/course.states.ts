import { Course } from '../../@models/course';
import { Author } from '../../@models/author';

export interface ICourseStates {
  courses: Course[];
  authors: Author[];
}
