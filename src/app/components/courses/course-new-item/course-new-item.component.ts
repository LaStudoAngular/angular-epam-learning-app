import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CourseService } from '../../../@services/course.service';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { Author } from '../../../@models/author';
import { Course } from '../../../@models/course';

@Component({
  selector: 'ep-course-new-item',
  templateUrl: './course-new-item.component.html',
  styleUrls: ['./course-new-item.component.scss'],
})
export class CourseNewItemComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public title = 'create new course';
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
      authors: [null, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { title, date, duration, description, authors } = this.form.value;
      const author: Author = new Author(authors.split(' ')[0], authors.split(' ')[1]);
      const course: Course = new Course(title, description, false, date, [author], duration);
      this.courseService.createCourse(course).subscribe(() => {
        this.goBack();
        takeUntil(this.destroyedSource);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }

  public goBack(): void {
    this.router.navigate(['courses']);
  }
}
