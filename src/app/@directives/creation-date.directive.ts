import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[epCreationDate]',
})
export class CreationDateDirective implements OnInit {
  @Input() creationDate: string;
  @HostBinding('style.borderColor') bdColor: string;
  colors = {
    green: '#9bc837',
    blue: '#30b6dd',
  };

  ngOnInit(): void {
    if (
      new Date(this.creationDate) < this.currentDate() &&
      new Date(this.creationDate) >= this.daysBefore(14)
    ) {
      this.bdColor = this.colors.green;
    } else if (new Date(this.creationDate) > this.currentDate()) {
      this.bdColor = this.colors.blue;
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
