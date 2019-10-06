import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../@models/course';
import { environment } from '../../environments/environment';
import { IAuthor } from '../@interfaces/author';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [];
  private COURSES_PER_ONE_LOADING = 3;
  private CURRENT_INDEX_COURSE = 0;

  // INDICATOR
  private spinnerSource = new BehaviorSubject<boolean>(true);
  public spinner$ = this.spinnerSource.asObservable();

  // STREAM OF COURSES
  private coursesSource = new BehaviorSubject<Course[]>(null);
  public courses$ = this.coursesSource.asObservable();

  // STREAM OF BREADCRUMBS TITLE
  public title$ = new BehaviorSubject<string>(null);
  public titleSource = this.title$.asObservable();

  constructor(private http: HttpClient) {
    this.getCourses();
    this.getAuthors();
  }

  // GET COURSES FROM SERVER DATABASE
  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${environment.baseURL}/courses?start=${this.CURRENT_INDEX_COURSE}&count=${this.COURSES_PER_ONE_LOADING}`,
    );
    // .pipe(tap(() => this.spinnerSource.next(false)));
  }

  // GET SELECTED QUANTITY OF COURSES
  public getPortionOfCourses(): void {
    this.CURRENT_INDEX_COURSE += this.COURSES_PER_ONE_LOADING;
    this.getCourses();
  }

  // ADD NEW COURSE IN SERVER DATABASE
  public createCourse(course: Course): Observable<boolean> {
    this.http.post(`${environment.baseURL}/courses`, course).subscribe((response: Course) => {
      this.courses = [...this.courses, response];
      this.coursesSource.next(this.courses);
    });
    return of(true);
  }

  // EDIT COURSE
  public editCourse(course: Course): Observable<boolean> {
    // EDIT REMOTE DATABASE
    this.http
      .put(`${environment.baseURL}/courses/${course.id}`, course)
      .subscribe((response: Course) => {
        // EDIT LOCAL DATABASE
        this.courses = this.courses.map((el: Course) => {
          if (el.id === course.id) {
            return {
              name: response.name,
              description: response.description,
              isTopRated: response.isTopRated,
              date: response.date,
              authors: response.authors,
              length: response.length,
              id: response.id,
            };
          } else {
            return el;
          }
        });
        this.coursesSource.next(this.courses);
      });
    return of(true);
  }

  // DELETE SELECTED COURSE FROM DATABASE
  public removeCourse(course: Course): Observable<boolean> {
    this.http.delete(`${environment.baseURL}/courses/${course.id}`).subscribe(() => {
      // EDIT LOCAL DATABASE
      this.courses = this.courses.filter((el: Course) => el.id !== course.id);
      this.coursesSource.next(this.courses);
    });
    return of(true);
  }

  // GET SELECTED COURSE FROM LOCAL DATABASE
  public getSelectedCourse(id: number): Observable<Course> {
    const course: Course = this.courses.find((el: Course) => el.id === id);
    return of(course);
  }

  // GET AUTHORS
  public getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.baseURL}/authors`);
  }
}
