import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[epCreationDate]',
})
export class CreationDateDirective implements OnInit {
  @Input() creationDate: string;

  @HostBinding('style.borderColor') bdColor: string;

  ngOnInit(): void {
    if (this.creationDate < this.currentDate() && this.creationDate >= this.daysBefore(14)) {
      this.bdColor = '#9bc837';
    } else if (this.creationDate > this.currentDate()) {
      this.bdColor = '#30b6dd';
    }
  }

  private currentDate(): Date {
    return new Date();
  }

  private daysBefore(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
}
