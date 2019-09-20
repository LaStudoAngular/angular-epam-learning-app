import { Injectable } from '@angular/core';
import { Course } from '../@interfaces/course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  public getAllCourses(): Observable<any> {
    return this.http.get('http://localhost:3004/courses');
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
