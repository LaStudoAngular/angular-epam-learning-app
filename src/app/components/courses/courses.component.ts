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
    this.courseService.getAllCourses().subscribe((response: Course[]) => (this.courses = response));
  }

  onSearch(): void {
    // this.courses = this.courseService
    //   .getAllCourses()
    //   .filter((el: Course) => el.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
  }

  onAddNewCourse(): void {
    console.log(`add new course`);
  }

  removeCourse(course: Course) {
    const answer = confirm('Do you really want to delete this course? Yes/No');
    if (answer) {
      this.courseService.removeCourse(course);
    }
  }

  loadMore(): void {
    console.log(`load more courses`);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
