import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../@interfaces/course';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(items: Course[]): Course[] {
    return items.sort(
      (a: Course, b: Course) =>
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime(),
    );
  }
}
