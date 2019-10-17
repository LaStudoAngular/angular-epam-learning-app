import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[epDateValidate]',
  providers: [
    provide: NG_VALIDATORS,
    useValue: dateValidate,
  ]
})
export class DateValidateDirective {

  constructor() { }

}

function dateValidate(control: AbstractControl) {
  const pattern = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;

}
