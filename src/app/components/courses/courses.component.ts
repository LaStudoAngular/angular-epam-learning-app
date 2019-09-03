import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Course } from '../../@interfaces/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  search: string;
  courses: Course[] = [];
  course: Course;
  show = false;
  form: FormGroup;
  button = 'create';

  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe((response: Course[]) => (this.courses = response));
    this.form = this.fb.group({
      title: [null, Validators.required],
      creationDate: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  onAddNewCourse(course?: Course): void {
    if (course) {
      this.course = course;
      this.form.patchValue({
        title: this.course.title,
        creationDate: this.formatDate(this.course.creationDate),
        duration: this.course.duration,
        description: this.course.description,
      });
      this.button = 'edit';
    }
    this.show = true;
  }

  onSubmit() {
    if (this.form.valid) {
      const title: string = this.form.get('title').value;
      const creationDate: Date = this.form.get('creationDate').value;
      const duration: number = this.form.get('duration').value;
      const description: string = this.form.get('description').value;
      if (this.button === 'create') {
        this.courseService
          .editCourse(title, creationDate, duration, description, 'create')
          .subscribe(
            response => {
              this.show = false;
              this.course = null;
              // TODO: add unsubscribe
            },
            error => console.log(error), // TODO: rewrite error handler
          );
      } else {
        this.courseService
          .editCourse(title, creationDate, duration, description, 'edit', this.course.id)
          .subscribe(
            response => {
              this.show = false;
              this.button = 'create';
              this.course = null;
              // TODO: add unsubscribe
            },
            error => console.log(error), // TODO: rewrite error handler
          );
      }
    }
    this.form.reset();
  }

  onClose(): void {
    this.show = false;
    this.button = 'create';
    this.course = null;
    this.form.reset();
  }

  loadMore(): void {
    console.log(`load more courses`);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
