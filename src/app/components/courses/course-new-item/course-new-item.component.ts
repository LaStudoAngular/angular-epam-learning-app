import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, takeUntil } from 'rxjs/operators';
import { CourseService } from '../../../@services/course.service';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { Author } from '../../../@models/author';
import { Course } from '../../../@models/course';
import uuid from 'uuid/v1';
import { IAuthor } from '../../../@interfaces/author';

@Component({
  selector: 'ep-course-new-item',
  templateUrl: './course-new-item.component.html',
  styleUrls: ['./course-new-item.component.scss'],
})
export class CourseNewItemComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public title = 'create new course';
  public indicator = true;
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  authors: IAuthor[];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    // INITIALIZE FORM
    this.form = this.fb.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
      authors: [null, [Validators.required]],
    });

    // GET LIST OF AUTHORS
    this.courseService.getAuthors().subscribe((authors: IAuthor[]) => {
      this.authors = authors;
      takeUntil(this.destroyedSource);
    });

    // GET INDICATOR STATUS
    this.courseService.spinner$
      .pipe(
        delay(1000),
        takeUntil(this.destroyedSource),
      )
      .subscribe((response: boolean) => (this.indicator = response));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { title, date, duration, description, authors } = this.form.value;
      const course: Course = new Course(
        title,
        description,
        false,
        new Date(date).toISOString(),
        authors,
        duration,
      );
      console.log(course);
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
