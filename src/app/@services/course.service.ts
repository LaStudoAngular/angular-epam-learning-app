import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../@models/course';
import { environment } from '../../environments/environment';
import { IAuthor } from '../@interfaces/author';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private COURSES_PER_ONE_LOADING = 3;
  private CURRENT_INDEX_COURSE = 0;

  // DIALOG SHOW
  private dialogSource = new BehaviorSubject<boolean>(false);
  public dialog$ = this.dialogSource.asObservable();

  // STREAM OF BREADCRUMBS TITLE
  public title$ = new BehaviorSubject<string>(null);
  public titleSource = this.title$.asObservable();

  constructor(private http: HttpClient) {
    this.getAuthors();
  }

  // GET COURSES
  public getCourse(): Observable<any> {
    const response = this.http.get(`${environment.baseURL}/courses?start=${this.CURRENT_INDEX_COURSE}&count=${this.COURSES_PER_ONE_LOADING}`);
    this.CURRENT_INDEX_COURSE += this.COURSES_PER_ONE_LOADING;
    return response;
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
  public dialogClose(): void {
    this.dialogSource.next(false);
  }

  // OPEN DIALOG WINDOW
  public dialogOpen(): void {
    this.dialogSource.next(true);
  }

  // EDIT COURSE
  public alterCourse(course: Course): Observable<any> {
    return this.http.put(`${environment.baseURL}/courses/${course.id}`, course);
  }

  // GET AUTHORS
  public getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.baseURL}/authors`);
  }

  // SEARCH COURSES
  public searchCourses(value: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/courses?textFragment=${value}`);
  }
}
