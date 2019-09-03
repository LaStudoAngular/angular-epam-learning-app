import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../../@services/course.service';
import { Course } from '../../@interfaces/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  search: string;
  courses: Course[] = [];
  course: Course;
  show = false;
  form: FormGroup;
  button = 'create';
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  ngOnInit() {
    this.courseService.source.subscribe((response: Course[]) => (this.courses = response));
    this.form = this.fb.group({
      title: [null, Validators.required],
      creationDate: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
      authors: [null, [Validators.required]],
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
        authors: this.course.authors,
      });
      this.button = 'edit';
    }
    this.show = true;
  }

  public onSubmit() {
    if (this.form.valid) {
      const { title, creationDate, duration, description, authors } = this.form.value;
      if (this.button === 'create') {
        this.courseService
          .createCourse(title, creationDate, duration, description, authors)
          .subscribe(() => {
            takeUntil(this.destroyedSource);
          });
      } else {
        this.courseService
          .editCourse(title, creationDate, duration, description, this.course.id, authors)
          .subscribe(() => {
            takeUntil(this.destroyedSource);
          });
      }
      this.onClose();
    }
  }

  public onClose(): void {
    this.show = false;
    this.button = 'create';
    this.course = null;
    this.form.reset();
  }

  public loadMore(): void {
    console.log(`load more courses`);
  }

  trackByFn(index, item): void {
    return item ? item.id : undefined;
  }

  ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }

  public formatDate(date) {
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
