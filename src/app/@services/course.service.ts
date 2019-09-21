import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Course } from '../@models/course';

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
    return this.http
      .get('http://localhost:3004/courses')
      .pipe(filter((course: Course) => course.id === id));
  }

  public createCourse(course: Course): Observable<boolean> {
    this.courses.push(course);
    this.stream$.next(this.courses);
    return of(true);
  }

  // public editCourse(course: Course): Observable<boolean> {
  //   this.courses = [...this.courses].map((course: Course) => {
  //     if (course.id === id) {
  //       return {
  //         id,
  //         title,
  //         creationDate,
  //         duration,
  //         description,
  //         topRated: course.isTopRated,
  //         authors: Array.isArray(authors) ? authors : authors.split(','),
  //       };
  //     }
  //     return course;
  //   });
  //   this.stream$.next(this.courses);
  //   return of(true);
  // }

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
