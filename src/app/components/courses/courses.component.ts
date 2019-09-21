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
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe((courses: Course[]) => (this.courses = courses));
  }

  onAddNewCourse(): void {
    this.courseService.title$.next('new course');
    this.router.navigateByUrl('/courses/new');
  }

  public loadMore(): void {
    console.log(`load more courses`);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
