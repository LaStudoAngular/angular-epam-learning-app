import { Injectable } from '@angular/core';
import { Course } from '../@interfaces/course';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[];
  private stream$ = new BehaviorSubject<Course[]>(null);
  public source = this.stream$.asObservable();

  constructor() {
    this.courses = [
      {
        id: 1,
        title: 'video course 1. Angular',
        creationDate: new Date(2019, 1, 9),
        duration: 88,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description.Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: false,
      },
      {
        id: 2,
        title: 'video course 2. Vue.js',
        creationDate: new Date(2019, 7, 10),
        duration: 148,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: true,
      },
      {
        id: 3,
        title: 'video course 3. React.js',
        creationDate: new Date(2019, 10, 5),
        duration: 208,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: false,
      },
    ];
    this.stream$.next(this.courses);
  }

  public getAllCourses(): Observable<Course[]> {
    return this.source;
  }

  public editCourse(
    title,
    creationDate,
    duration,
    description,
    flag: 'create' | 'edit',
    id?,
  ): Observable<boolean> {
    if (flag === 'create') {
      const newCourse = {
        id: this.getID(),
        title,
        creationDate: new Date(creationDate),
        duration,
        description,
        topRated: false,
      };
      this.courses.push(newCourse);
    } else {
      this.courses = this.courses.map((course: Course) => {
        if (course.id === id) {
          course.title = title;
          course.creationDate = creationDate;
          course.duration = duration;
          course.description = description;
        }
        return course;
      });
    }
    this.stream$.next(this.courses);
    return of(true);
  }

  public removeCourse(course: Course): void {
    this.courses = this.courses.filter(el => el.id !== course.id);
    this.stream$.next(this.courses);
  }

  private getID(): number {
    let count = 1;
    this.courses.forEach(el => {
      if (el.id > count) {
        count = el.id;
      }
    });
    count += 1;
    return count;
  }
}
