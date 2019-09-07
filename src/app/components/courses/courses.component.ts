import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Course } from '../../@interfaces/course';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  search: string;
  courses: Course[] = [];
  course: Course;
  // show = false;
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.courseService.source.subscribe((response: Course[]) => (this.courses = response));
  }

  onAddNewCourse(): void {
    this.router.navigateByUrl('/courses/new');
    // this.show = true;
  }

  public loadMore(): void {
    console.log(`load more courses`);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
