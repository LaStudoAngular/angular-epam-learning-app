import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../@models/course';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  search: string;
  courses: Course[] = [];
  course: Course;
  showMore = false;
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.courseService.sourceLimited.subscribe((response: Course[]) => (this.courses = response));
  }

  onAddNewCourse(): void {
    this.courseService.title$.next('new course');
    this.router.navigate(['courses/new']);
  }

  public loadMore(): void {
    this.courseService
      .fetchLimitedCourses()
      .subscribe((response: boolean) => (this.showMore = response));
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
