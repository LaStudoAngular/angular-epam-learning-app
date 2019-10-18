import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[epDateValidate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: ptDateValidate,
      multi: true
    }
  ]
})
export class DateValidateDirective {}

function ptDateValidate({ value }: AbstractControl): { [key: string]: any } | null {
  const pattern = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
  if (value) {
    return value.match(pattern) ? null : { errorDate: { value: 'date input error' } }
  }
}
