import { Injectable } from '@angular/core';
import { Course } from '../@interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[];

  constructor() {
    this.courses = [
      {
        id: 1,
        title: 'video course 1. name tag',
        creation_date: new Date(2019, 1, 9),
        duration: '1h 28 min',
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description.Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
      },
      {
        id: 2,
        title: 'video course 2. name tag',
        creation_date: new Date(2019, 7, 10),
        duration: '2h 28 min',
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
      },
      {
        id: 3,
        title: 'video course 3. name tag',
        creation_date: new Date(2019, 10, 5),
        duration: '3h 28 min',
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
      },
    ];
  }

  getAllCourses(): Course[] {
    return this.courses;
  }
}
