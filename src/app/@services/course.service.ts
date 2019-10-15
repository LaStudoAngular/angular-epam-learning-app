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

  // DIALOG SHOW
  private dialogSource = new BehaviorSubject<boolean>(false);
  public dialog$ = this.dialogSource.asObservable();

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

  // GET COURSES
  public getCourse(): Observable<any> {
    return this.http.get(`${environment.baseURL}/courses`);
  }

  // DELETE SELECTED COURSE
  public deleteCourse(course: Course): Observable<any> {
    return this.http.delete(`${environment.baseURL}/courses/${course.id}`);
  }

  // CREATE NEW COURSE
  public addCourse(course: Course): Observable<any> {
    return this.http.post(`${environment.baseURL}/courses`, course);
  }

  // CLOSE DIALOG WINDOW
  public dialogClose() {
    this.dialogSource.next(false);
  }

  // OPEN DIALOG WINDOW
  public dialogOpen() {
    this.dialogSource.next(true);
  }

  // EDIT COURSE
  public alterCourse(course: Course): Observable<any> {
    return this.http.put(`${environment.baseURL}/courses/${course.id}`, course);
  }

  // GET COURSES FROM SERVER DATABASE
  public getCourses(): void {
    this.http
      .get<Course[]>(
        `${environment.baseURL}/courses?start=${this.CURRENT_INDEX_COURSE}&count=${this.COURSES_PER_ONE_LOADING}`,
      )
      .pipe(tap(() => this.spinnerSource.next(false)))
      .subscribe((response: Course[]) => {
        this.courses = [...this.courses, ...response];
        this.coursesSource.next(this.courses);
      });
  }

  // GET SELECTED QUANTITY OF COURSES
  public getPortionOfCourses(): void {
    this.CURRENT_INDEX_COURSE += this.COURSES_PER_ONE_LOADING;
    this.getCourses();
  }

  // GET AUTHORS
  public getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.baseURL}/authors`);
  }
}
