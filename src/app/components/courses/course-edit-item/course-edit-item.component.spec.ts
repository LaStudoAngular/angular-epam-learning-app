import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditItemComponent } from './course-edit-item.component';

describe('CourseEditItemComponent', () => {
  let component: CourseEditItemComponent;
  let fixture: ComponentFixture<CourseEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseEditItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
