import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../@interfaces/course';

@Component({
  selector: 'ep-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  onDelete(course: Course): void {
    this.deleteCourse.emit(course);
  }
}
