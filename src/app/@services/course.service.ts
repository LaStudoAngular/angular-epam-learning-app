import { Injectable } from '@angular/core';
import { Course } from '../@interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseItems: Course[];

  constructor() {
    //
  }
}
