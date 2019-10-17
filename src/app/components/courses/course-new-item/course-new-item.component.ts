import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CourseService } from '../../../@services/course.service';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { Course } from '../../../@models/course';
import { IAuthor } from '../../../@interfaces/author';
import { Store } from '@ngrx/store';
import { ICourseStates } from '../../../store/state/course.states';
import { AddCourse } from '../../../store/actions/course.actions';

@Component({
  selector: 'ep-course-new-item',
  templateUrl: './course-new-item.component.html',
  styleUrls: ['./course-new-item.component.scss'],
})
export class CourseNewItemComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public title = 'create new course';
  public indicator = true;
  public buttonStatus = true;
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  authors: IAuthor[];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private store: Store<ICourseStates>,
  ) {}

  public ngOnInit(): void {
    // INITIALIZE FORM
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      date: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      authors: [null, [Validators.required]],
    });

    // GET LIST OF AUTHORS
    this.courseService.getAuthors().subscribe((authors: IAuthor[]) => {
      this.authors = authors;
      takeUntil(this.destroyedSource);
    });

    // GET INDICATOR STATUS
    setTimeout(() => this.indicator = false, 1000);
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
      this.store.dispatch(new AddCourse(course));
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
