import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListItemComponent } from './courses-list-item.component';
import { Course } from '../../../../@interfaces/course';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;
  let course: Course;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 1,
      title: 'title',
      duration: 'duration',
      creation_date: 'creation_date',
      description: 'description',
    };
    course = {
      id: 1,
      title: 'title',
      duration: 'duration',
      creation_date: 'creation_date',
      description: 'description',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should emit #deleteCourse event when method #onDelete is called`, () => {
    spyOn(component.deleteCourse, 'emit');
    component.onDelete(course);
    expect(component.deleteCourse.emit).toHaveBeenCalledWith(course);
  });

  it(`should have method #onDelete`, () => {
    const comp = new CoursesListItemComponent();
    expect(comp.onDelete).toBeDefined();
  });
});
