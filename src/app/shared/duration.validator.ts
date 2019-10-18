import { AbstractControl } from '@angular/forms';

export function validateDuration(control: AbstractControl): {[key: string]: { [key: string]: string }} | null {
  const testControl = /^[0-9]*$/.test(control.value);
  return testControl ? null : { errorMessage: { value: 'input numbers error' } }
}
