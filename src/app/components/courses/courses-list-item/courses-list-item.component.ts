import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Course } from '../../../@interfaces/course';
import { CourseService } from '../../../@services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent {
  @Input() course: Course;
  show = false;

  constructor(private courseService: CourseService, private router: Router) {}

  onDeleteCourse(): void {
    this.show = true;
  }

  deleteCourse(course: Course) {
    this.courseService.removeCourse(course);
  }

  cancelDelete() {
    this.show = false;
  }

  onEditCourse(course: Course): void {
    this.router.navigate(['courses', `${course.id}`]);
  }
}
