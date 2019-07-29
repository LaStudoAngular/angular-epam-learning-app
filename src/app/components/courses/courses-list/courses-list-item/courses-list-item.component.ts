import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../../../@interfaces/course';

@Component({
  selector: 'ep-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  constructor() {}

  ngOnInit() {}

  onDelete(course: Course): void {
    this.deleteCourse.emit(course);
  }
}
