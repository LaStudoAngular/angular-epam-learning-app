import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../@models/course';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(items: Course[]): Course[] {
    return items.sort(
      (a: Course, b: Course) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }
}
