import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../@models/course';

@Pipe({
  name: 'searchBy',
})
export class SearchByPipe implements PipeTransform {
  transform(courses: Course[], searchCourse: string): Course[] {
    if (!courses || !searchCourse) {
      return courses;
    }
    return courses.filter(
      (course: Course) => course.name.toLowerCase().indexOf(searchCourse.toLowerCase()) !== -1,
    );
  }
}
