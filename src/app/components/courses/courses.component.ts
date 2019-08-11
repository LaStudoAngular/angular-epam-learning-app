import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Course } from '../../@interfaces/course';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  search: string;
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courses = this.courseService.getAllCourses();
  }

  onSearch(): void {
    if (!this.search) {
      return;
    }
    console.log(this.search);
  }

  onAdd(): void {
    console.log(`add new course`);
  }

  loadMore(): void {
    console.log(`load more courses`);
  }

  removeCourse(course: Course) {
    console.log(course.id);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
