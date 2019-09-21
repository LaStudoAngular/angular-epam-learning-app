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
  private count = 3;
  flag: boolean;

  // STREAM OF COURSES
  private stream$ = new BehaviorSubject<Course[]>(null);
  public source = this.stream$.asObservable();

  private limitedStream$ = new BehaviorSubject<Course[]>(null);
  public sourceLimited = this.limitedStream$.asObservable();

  // STREAM OF BREADCRUMBS TITLE
  public title$ = new BehaviorSubject<string>(null);
  public titleSource = this.title$.asObservable();

  constructor(private http: HttpClient) {
    this.getAllCourses();
    this.getLimitCourses();
  }

  // GET ALL COURSES FROM SERVER DATABASE
  private getAllCourses(): void {
    this.http.get('http://localhost:3004/courses').subscribe((response: Course[]) => {
      this.courses = response;
      this.stream$.next(this.courses);
    });
  }

  public getLimitCourses(): void {
    this.http
      .get(`http://localhost:3004/courses?start=0&count=${this.count}`)
      .subscribe((data: Course[]) => {
        this.limitedStream$.next(data);
      });
  }

  public fetchLimitedCourses(): Observable<boolean> {
    this.count += 3;
    this.http.get('http://localhost:3004/courses').subscribe((response: Course[]) => {
      if (this.count <= response.length) {
        this.http
          .get(`http://localhost:3004/courses?start=0&count=${this.count}`)
          .subscribe((data: Course[]) => {
            this.courses = data;
            this.limitedStream$.next(this.courses);
            this.flag = false;
          });
      }
      if (this.count > response.length) {
        this.flag = true;
      }
    });
    return of(this.flag);
  }

  public getSelectedCourse(id: number): Observable<Course> {
    return this.http
      .get('http://localhost:3004/courses')
      .pipe(filter((course: Course) => course.id === id));
  }

  // ADD NEW COURSE IN SERVER DATABASE
  public createCourse(course: Course): Observable<boolean> {
    this.http.post('http://localhost:3004/courses', course).subscribe((response: Course) => {
      this.courses.push(response);
      this.limitedStream$.next(this.courses);
    });
    return of(true);
  }

  // EDIT COURSE
  public editCourse(course: Course): Observable<boolean> {
    this.http.post('http://localhost:3004/courses', course).subscribe((response: Course) => {
      console.log(response);
    });
    // this.courses = [...this.courses].map((course: Course) => {
    //   if (course.id === id) {
    //     return {
    //       id,
    //       title,
    //       creationDate,
    //       duration,
    //       description,
    //       topRated: course.isTopRated,
    //       authors: Array.isArray(authors) ? authors : authors.split(','),
    //     };
    //   }
    //   return course;
    // });
    // this.stream$.next(this.courses);
    return of(true);
  }

  // DELETE SELECTED COURSE FROM DATABASE
  public removeCourse(course: Course): Observable<any> {
    this.http.delete(`http://localhost:3004/courses/${course.id}`).subscribe(() => {
      this.courses = this.courses.filter(el => el.id !== course.id);
      this.limitedStream$.next(this.courses);
    });
    return;
  }
}
