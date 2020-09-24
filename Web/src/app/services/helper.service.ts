import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  markAsTouched(form: FormGroup) {
    (<any>Object).values(form.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
    });
  }
  clearForm(form: FormGroup) {
    (<any>Object).values(form.controls).forEach((control: AbstractControl) => {
      control.reset();
      control.markAsUntouched();
    });
  }

}
