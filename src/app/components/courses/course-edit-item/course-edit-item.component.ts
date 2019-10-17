import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../@services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { Course } from '../../../@models/course';
import { Author } from '../../../@models/author';
import uuid from 'uuid/v1';
import { Store, select } from '@ngrx/store';
import { ICourseStates } from 'src/app/store/state/course.states';
import { selectSelectedCourse } from 'src/app/store/selectors/course.selectors';
import { EditCourse } from 'src/app/store/actions/course.actions';

@Component({
  selector: 'ep-course-edit-item',
  templateUrl: './course-edit-item.component.html',
  styleUrls: ['./course-edit-item.component.scss'],
})
export class CourseEditItemComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ICourseStates>
  ) {}

  public indicator = true;
  public buttonStatus = true;
  public form: FormGroup;
  public course: Course;
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public ngOnInit(): void {

    // GET INDICATOR STATUS
    setTimeout(() => this.indicator = false, 1000);

    // GENERATE FORM
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      date: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      authors: [null, [Validators.required]],
    });

    // BUTTON STATUS
    this.form.valueChanges.subscribe(() => this.buttonStatus = this.form.valid);

    // GET ID OF SELECTED COURSE
    this.route.params.subscribe((data: { id: string }) => {
      const courseID = Number(data.id);
      // GET SELECTED COURSE FROM STORE
      this.store.pipe(select(selectSelectedCourse(courseID))).subscribe((course: Course) => {
        this.course = course;
        // PATCH FORM FIELDS
        this.form.patchValue({
          title: this.course.name,
          date: this.formatDate(course.date),
          duration: this.course.length,
          description: this.course.description,
          authors: this.course.authors.map((el: Author) => {
            return {
              ...el,
              // ADD FIELD FOR PLUGIN OUTPUT
              fullName: `${el.firstName} ${el.lastName}`,
            };
          }),
        });
        // GENERATE BREADCRUMBS FROM SELECTED COURSE
        this.courseService.title$.next(`${course.name}`);
      });

    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { title, date, duration, description, authors } = this.form.value;
      const course: Course = new Course(
        title,
        description,
        this.course.isTopRated,
        new Date(date).toISOString(),
        authors,
        duration,
        this.course.id,
      );
      this.store.dispatch(new EditCourse(course));
    }
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

  public goBack(): void {
    this.form.reset();
    this.courseService.title$.next('');
    this.router.navigate(['courses']);
  }

  public ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }
}
