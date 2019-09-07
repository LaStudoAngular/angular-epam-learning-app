import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ep-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public title: string;
  public subtitle: string;

  ngOnInit(): void {
    this.title = 'page not found';
    this.subtitle = 'Perhaps try later? Or';
  }
}
