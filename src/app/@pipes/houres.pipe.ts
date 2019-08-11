import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours',
})
export class HouresPipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = value / 60;
    const roundedHours: number = Math.floor(hours);
    const minutes: number = (hours - roundedHours) * 60;
    const roundedMinutes: number = Math.floor(minutes);
    if (roundedHours === 0) {
      return `${roundedMinutes}min`;
    } else {
      return `${roundedHours}h ${roundedMinutes}min`;
    }
  }
}
