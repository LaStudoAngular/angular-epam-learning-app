import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../@services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../../@models/course';
import { Author } from '../../../@models/author';

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
  ) {}
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public form: FormGroup;
  course: Course;

  public ngOnInit(): void {
    // GENERATE FORM
    this.form = this.fb.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
      authors: [null, [Validators.required]],
    });

    // GET ID OF SELECTED COURSE
    this.route.params.subscribe((data: { id: string }) => {
      const courseID = Number(data.id);
      // GET SELECTED COURSE FROM LOCAL DATABASE
      this.courseService.getSelectedCourse(courseID).subscribe((course: Course) => {
        this.course = course;
        this.form.patchValue({
          title: this.course.name,
          date: this.formatDate(course.date),
          duration: this.course.length,
          description: this.course.description,
          authors: this.course.authors,
        });
        // GENERATE BREADCRUMBS FROM SELECTED COURSE
        this.courseService.title$.next(`${course.name}`);
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { title, date, duration, description, authors } = this.form.value;
      console.log(authors);
      // const author: Author = new Author(authors.split(' ')[0], authors.split(' ')[1]);
      // const course: Course = new Course(title, description, false, date, [author], duration);
      /*
      this.courseService.editCourse(course).subscribe(() => {
        this.goBack();
        takeUntil(this.destroyedSource);
      });
      */
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

  addTagFn(name) {
    return { firstName: name.split(' ')[0], lastName: name.split(' ')[1] };
  }

  public ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }
}
