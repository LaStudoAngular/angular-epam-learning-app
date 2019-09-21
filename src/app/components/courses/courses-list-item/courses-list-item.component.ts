import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CourseService } from '../../../@services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../../@models/course';

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

  // SHOW DIALOG WINDOW
  onDeleteCourse(): void {
    this.show = true;
  }

  // CLOSE DIALOG WINDOW
  cancelDelete() {
    this.show = false;
  }

  // DELETE COURSE FROM DATABASE
  deleteCourse(course: Course) {
    this.courseService.removeCourse(course).subscribe(() => (this.show = false));
  }

  // NAVIGATE TO EDIT COURSE PAGE
  onEditCourse(course: Course): void {
    this.router.navigate(['courses', `${course.id}`]);
  }
}
