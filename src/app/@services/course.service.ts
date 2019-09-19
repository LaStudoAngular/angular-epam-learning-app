import { Injectable } from '@angular/core';
import { Course } from '../@interfaces/course';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[];

  // STREAM OF COURSES
  private stream$ = new BehaviorSubject<Course[]>(null);
  public source = this.stream$.asObservable();

  // STREAM OF BREADCRUMBS TITLE
  public title$ = new BehaviorSubject<string>(null);
  public titleSource = this.title$.asObservable();

  constructor() {
    this.courses = [
      {
        id: 1,
        title: 'Angular',
        creationDate: new Date(2019, 1, 9),
        duration: 88,
        description:
          'Learn about where you can find course descriptions, what information they include, how they work, ' +
          'and details about various components of a course description.Course descriptions report information about ' +
          "a university or college's classes. They're published both in course catalogs that outline degree requirements " +
          'and in course schedules that contain descriptions for all courses offered during a particular semester.',
        topRated: false,
        authors: ['john papa'],
      },
      {
        id: 2,
        title: 'Vue.js',
        creationDate: new Date(2019, 7, 10),
        duration: 148,
        description:
          'Learn about where you can find course descriptions, what information they include, how they work, ' +
          'and details about various components of a course description. Course descriptions report information ' +
          "about a university or college's classes. They're published both in course catalogs that outline degree " +
          'requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
        topRated: true,
        authors: ['evan you'],
      },
      {
        id: 3,
        title: 'React.js',
        creationDate: new Date(2019, 10, 5),
        duration: 208,
        description:
          'Learn about where you can find course descriptions, what information they include, how they work, ' +
          'and details about various components of a course description. Course descriptions report information ' +
          "about a university or college's classes. They're published both in course catalogs that outline degree " +
          'requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
        topRated: false,
        authors: ['den abramov'],
      },
    ];
    this.stream$.next(this.courses);
  }

  public getSelectedCourse(id: number): Observable<Course> {
    return of(this.courses.find((course: Course) => course.id === id));
  }

  public createCourse(title, creationDate, duration, description, authors): Observable<boolean> {
    const newCourse = {
      id: this.setID(),
      title,
      creationDate: new Date(creationDate),
      duration,
      description,
      topRated: false,
      authors: authors.split(','),
    };
    this.courses.push(newCourse);
    this.stream$.next(this.courses);
    return of(true);
  }

  public editCourse(title, creationDate, duration, description, id, authors): Observable<boolean> {
    this.courses = [...this.courses].map((course: Course) => {
      if (course.id === id) {
        return {
          id,
          title,
          creationDate,
          duration,
          description,
          topRated: course.topRated,
          authors: Array.isArray(authors) ? authors : authors.split(','),
        };
      }
      return course;
    });
    this.stream$.next(this.courses);
    return of(true);
  }

  public removeCourse(course: Course): void {
    this.courses = this.courses.filter(el => el.id !== course.id);
    this.stream$.next(this.courses);
  }

  private setID(): number {
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
