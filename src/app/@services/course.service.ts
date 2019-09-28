import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../@models/course';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {
    this.getAllCourses();
  }

  // GET ALL COURSES FROM SERVER DATABASE
  private getAllCourses(): void {
    this.http.get(`${environment.baseURL}/courses`).subscribe((response: Course[]) => {
      // INIT LOCAL DATABASE
      this.courses = response;
      this.stream$.next(this.courses);
    });
  }

  // GET SELECTED COURSE FROM LOCAL DATABASE
  public getSelectedCourse(id: number): Observable<Course> {
    const course: Course = this.courses.find((el: Course) => el.id === id);
    if (course) {
      return of(course);
    }
  }

  // ADD NEW COURSE IN SERVER DATABASE
  public createCourse(course: Course): Observable<boolean> {
    this.http.post(`${environment.baseURL}/courses`, course).subscribe((response: Course) => {
      this.courses.unshift(response);
      this.stream$.next(this.courses);
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
        this.stream$.next(this.courses);
      });
    return of(true);
  }

  // DELETE SELECTED COURSE FROM DATABASE
  public removeCourse(course: Course): Observable<any> {
    this.http.delete(`${environment.baseURL}/courses/${course.id}`).subscribe(() => {
      // EDIT LOCAL DATABASE
      this.courses = this.courses.filter(el => el.id !== course.id);
      this.stream$.next(this.courses);
    });
    return;
  }
}
