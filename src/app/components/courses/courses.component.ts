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
  count: number;
  showMore: boolean;
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.count = 3;
    this.showMore = false;
    this.courseService
      .getLimitCourses(this.count)
      .subscribe((courses: Course[]) => (this.courses = courses));
  }

  onAddNewCourse(): void {
    this.courseService.title$.next('new course');
    this.router.navigate(['courses/new']);
  }

  public loadMore(): void {
    this.count += this.count;
    this.courseService.getAllCourses().subscribe((response: Course[]) => {
      if (response.length > this.count) {
        this.courseService.getLimitCourses(this.count).subscribe((courses: Course[]) => {
          this.courses = courses;
        });
      } else {
        this.showMore = true;
        return;
      }
    });
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
