import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    this.getAllCourses();
  }

  // GET ALL COURSES FROM SERVER DATABASE
  private getAllCourses(): void {
    this.http.get('http://localhost:3004/courses').subscribe((response: Course[]) => {
      this.courses = response;
      this.stream$.next(this.courses);
    });
  }

  public getSelectedCourse(id: number): Observable<Course> {
    const course: Course = this.courses.find((el: Course) => el.id === id);
    if (course) {
      return of(course);
    }
  }

  // ADD NEW COURSE IN SERVER DATABASE
  public createCourse(course: Course): Observable<boolean> {
    this.http.post('http://localhost:3004/courses', course).subscribe((response: Course) => {
      this.courses.push(response);
      this.stream$.next(this.courses);
    });
    return of(true);
  }

  // EDIT COURSE
  public editCourse(course: Course): void {
    // console.log(course);
    this.http
      .put(`http://localhost:3004/courses/${course.id}`, course)
      .subscribe((response: Course) => {
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

    // return of(true);
  }

  // DELETE SELECTED COURSE FROM DATABASE
  public removeCourse(course: Course): Observable<any> {
    this.http.delete(`http://localhost:3004/courses/${course.id}`).subscribe(() => {
      this.courses = this.courses.filter(el => el.id !== course.id);
      this.stream$.next(this.courses);
    });
    return;
  }
}
