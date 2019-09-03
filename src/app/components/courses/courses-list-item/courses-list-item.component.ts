import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../@interfaces/course';
import { CourseService } from '../../../@services/course.service';

@Component({
  selector: 'ep-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent {
  @Input() course: Course;
  @Output() editCourse = new EventEmitter<Course>();
  show = false;

  constructor(private courseService: CourseService) {}

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
    this.editCourse.emit(course);
  }
}
