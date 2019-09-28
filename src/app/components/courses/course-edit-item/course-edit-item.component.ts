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
          authors: this.course.authors.map(el => {
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
      // DELETE FIELD FROM OBJECT
      const listOfAuthors = authors.map(el => {
        return {
          firstName: el.firstName,
          lastName: el.lastName,
          id: el.id,
        };
      });
      const course: Course = new Course(
        title,
        description,
        this.course.isTopRated,
        new Date(date).toISOString(),
        listOfAuthors,
        duration,
        this.course.id,
      );

      this.courseService.editCourse(course).subscribe(() => {
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
    this.courseService.title$.next('');
    this.router.navigate(['courses']);
  }

  private addAuthors(name: string) {
    return new Author(
      name.split(' ')[0],
      name.split(' ')[1],
      name,
      Math.floor(Math.random() * 10000),
    );
  }

  public ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }
}
