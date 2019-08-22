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
        title: 'video course 1. Angular',
        creationDate: new Date(2019, 1, 9),
        duration: 88,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description.Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: false,
      },
      {
        id: 2,
        title: 'video course 2. Vue.js',
        creationDate: new Date(2019, 7, 10),
        duration: 148,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: true,
      },
      {
        id: 3,
        title: 'video course 3. React.js',
        creationDate: new Date(2019, 10, 5),
        duration: 208,
        description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: false,
      },
    ];
  }

  getAllCourses(): Course[] {
    return this.courses;
  }

  createCourse() {
    //
  }

  removeCourse(course: Course) {
    this.courses = this.courses.filter(el => el.id !== course.id);
  }
}
