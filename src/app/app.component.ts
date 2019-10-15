import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetCourses } from './store/actions/course.actions';
import { ICourseStates } from './store/state/course.states';

@Component({
  selector: 'ep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<ICourseStates>) {}
  ngOnInit(): void {
    this.store.dispatch(new GetCourses());
  }
}
