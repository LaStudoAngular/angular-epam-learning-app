import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListItemComponent } from './courses-list-item.component';
// import { Course } from '../../../../@interfaces/course';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit(`should emit #deleteCourse event when the button is clicked`, () => {
    spyOn(component.deleteCourse, 'emit');
    component.onDelete();
    expect(component.deleteCourse.emit).toHaveBeenCalled();
  });
});
