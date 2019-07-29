import { Component, OnInit } from '@angular/core';
import { Course } from '../../../@interfaces/course';

@Component({
  selector: 'ep-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: Course[];

  constructor() { }

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        title: 'video course 1. name tag',
        creation_date: '9 Nov, 2018',
        duration: '1h 28 min',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description.Course descriptions report information about a university or college\'s classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.' },
      {
        id: 2,
        title: 'video course 2. name tag',
        creation_date: '9 Nov, 2018',
        duration: '1h 28 min',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college\'s classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.' },
      {
        id: 3,
        title: 'video course 3. name tag',
        creation_date: '9 Nov, 2018',
        duration: '1h 28 min',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college\'s classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.' }
    ];
  }

  removeCourse(course: Course) {
    console.log(course.id);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }

}
