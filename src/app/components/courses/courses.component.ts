import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ep-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  search: string;

  constructor() {}

  ngOnInit() {}

  onSearch(): void {
    if (!this.search) {
      return;
    }
    console.log(this.search);
  }

  onAdd(): void {
    console.log(`add new course`);
  }

  loadMore(): void {
    console.log(`load more courses`);
  }
}
