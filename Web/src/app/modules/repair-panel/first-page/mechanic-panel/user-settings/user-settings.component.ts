import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'crc-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.setForm();
  }

  setForm() {
    return this.formBuilder.group({
      firstName: ['', { validators: [Validators.required]}],
      lastName: ['', { validators: [Validators.required]}],
      country: ['', { validators: [Validators.required]}],
      city: ['', { validators: [Validators.required]}],
      street: ['', { validators: [Validators.required]}],
      houseNr: ['', { validators: [Validators.required]}],
      postCode: ['', { validators: [Validators.required]}]
    });
  }

}
