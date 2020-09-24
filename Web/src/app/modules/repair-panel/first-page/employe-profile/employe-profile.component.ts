import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { PersonModel } from 'src/app/models/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { EmployeeGarageModel } from '../../models/employee-garage.model';

@Component({
  selector: 'crc-employe-profile',
  templateUrl: './employe-profile.component.html',
  styleUrls: ['./employe-profile.component.scss']
})
export class EmployeProfileComponent implements OnInit {

  person: PersonModel;
  form: FormGroup;

  constructor(
    private personService: PersonService,
    private blockUi: BlockUIService,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private infoMessage: InfoMessageService) { }

  ngOnInit() {
    this.person = this.personService.currentPerson;

    this.initForm();
    if (this.person) {
      this.setValue();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', { validators: [Validators.required]}],
      lastName: ['', { validators: [Validators.required] }],
      email: [''],
      phoneNumber: ['', { validators: [Validators.required] }]
    });
  }

  setValue() {
    this.form.get('name').setValue(this.person.name);
    this.form.get('lastName').setValue(this.person.lastName);
    this.form.get('email').setValue(this.person.email);
    this.form.get('phoneNumber').setValue(this.person.phoneNumber);
  }

  edit() {
    if (!this.form.valid) {
      return;
    }
    this.blockUi.lockAll(true);
    const person = this.form.value as PersonModel;
    person.id = this.personService.currentPerson.id;
    person.personType = this.personService.currentPerson.personType;
    person.active = this.personService.currentPerson.active;

    this.personService.editPersonProfile(person).subscribe((personResp: EmployeeGarageModel) => {
      this.localStorage.setCurrentEmployee(personResp);
      this.blockUi.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie edytowano profil');
    }, () => {
      this.blockUi.lockAll(false);
      this.infoMessage.openErrorInfo('Błąd podczas edytowania profilu');
    });
  }
}
