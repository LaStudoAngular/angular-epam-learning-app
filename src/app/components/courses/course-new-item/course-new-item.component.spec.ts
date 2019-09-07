import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNewItemComponent } from './course-new-item.component';

describe('CourseNewItemComponent', () => {
  let component: CourseNewItemComponent;
  let fixture: ComponentFixture<CourseNewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseNewItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
