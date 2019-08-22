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
  show = false;
  form: FormGroup;

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

  onSearch(): void {
    // this.courses = this.courseService
    //   .getAllCourses()
    //   .filter((el: Course) => el.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
  }

  onAddNewCourse(): void {
    this.show = true;
  }

  onSubmit() {
    if (this.form.valid) {
      const title: string = this.form.get('title').value;
      const creationDate: Date = this.form.get('creationDate').value;
      const duration: number = this.form.get('duration').value;
      const description: string = this.form.get('description').value;
      this.courseService
        .createCourse(title, creationDate, duration, description)
        .subscribe(response => (this.show = false), error => console.log(error));
    }
  }

  onClose(): void {
    this.show = false;
  }

  loadMore(): void {
    console.log(`load more courses`);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }
}
