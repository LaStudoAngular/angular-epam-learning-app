import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../@services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../../@interfaces/course';

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
  public title = 'edit course';
  private destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public form: FormGroup;
  private courseID: number;

  public ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, Validators.required],
      creationDate: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
      authors: [null, [Validators.required]],
    });
    this.route.params.subscribe((data: { id: string }) => {
      this.courseID = Number(data.id);
      this.courseService.getSelectedCourse(this.courseID).subscribe((course: Course) => {
        this.form.patchValue({
          title: course.title,
          creationDate: this.formatDate(course.creationDate),
          duration: course.duration,
          description: course.description,
          authors: course.authors,
        });
        this.courseService.title$.next(`video course ${course.title}`);
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { title, creationDate, duration, description, authors } = this.form.value;
      this.courseService
        .editCourse(title, creationDate, duration, description, this.courseID, authors)
        .subscribe(() => {
          this.goBack();
          takeUntil(this.destroyedSource);
        });
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
    this.courseID = null;
    this.courseService.title$.next('');
    this.router.navigateByUrl('/courses');
  }

  public ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }
}
