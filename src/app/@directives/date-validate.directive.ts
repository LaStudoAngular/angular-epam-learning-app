import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[epDateValidate][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: DateValidateDirective,
      multi: true
    }
  ]
})
export class DateValidateDirective {
  ptDate(control: FormControl): { [key: string]: any } | any {
    const ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    return control.value.match(ptDatePattern) ? null : { dateError: { value: 'date input error' } }
  }

  usDate(control: FormControl): { [key: string]: any } | any {
    const usDatePattern = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;
    return control.value.match(usDatePattern) ? null : { dateError: { value: 'date input error' } }
  }
}
