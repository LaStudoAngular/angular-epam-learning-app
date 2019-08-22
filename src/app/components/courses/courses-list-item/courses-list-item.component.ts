import { Component, Input } from '@angular/core';
import { Course } from '../../../@interfaces/course';
import { CourseService } from '../../../@services/course.service';

@Component({
  selector: 'ep-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent {
  @Input() course: Course;
  constructor(private courseService: CourseService) {}

  onDeleteCourse(course: Course): void {
    const answer = confirm('Do you really want to delete this course? Yes/No');
    if (answer) {
      this.courseService.removeCourse(course);
    }
  }

  onEditCourse(course: Course): void {
    this.courseService.updateCourse(course);
  }
}
